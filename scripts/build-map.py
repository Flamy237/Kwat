"""Génère les calques de la carte de Bonamoussadi à partir d'un extrait OpenStreetMap.
Usage : python scripts/build-map.py <merged.json> <adm1.geojson>
Sortie : scripts/.layers/*.svg (rastérisés par render-layers.mjs) et lib/geo.json."""
import json, sys, math, os
src, adm = sys.argv[1], sys.argv[2]
d = json.load(open(src))
nodes, ways = d["nodes"], d["ways"]
W, E = 9.700, 9.772
VW, VH = 1600, 1000
K = VW / (E - W)
N = 4.1175
S = N - VH / K

def proj(lon, lat): return ((lon - W) * K, (N - lat) * K)

def rdp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy) or 1e-9
    i, m = 0, 0
    for k in range(1, len(pts) - 1):
        x, y = pts[k]
        dist = abs(dy * x - dx * y + x2 * y1 - y2 * x1) / L
        if dist > m: i, m = k, dist
    if m > eps:
        return rdp(pts[: i + 1], eps)[:-1] + rdp(pts[i:], eps)
    return [pts[0], pts[-1]]

def path(ref, eps=0.35, close=False):
    pts = [proj(*nodes[r]) for r in ref if r in nodes]
    if len(pts) < 2: return ""
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    if max(xs) < -20 or min(xs) > VW + 20 or max(ys) < -20 or min(ys) > VH + 20: return ""
    pts = rdp(pts[:-1] if close and pts[0] == pts[-1] else pts, eps)
    s = "M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts)
    return s + ("Z" if close else "")

L = {k: [] for k in "main mid res path drain stream water wetland bldg".split()}
for w in ways.values():
    t, r = w["t"], w["n"]
    h = t.get("highway"); ww = t.get("waterway"); nat = t.get("natural")
    if h in ("motorway","trunk","primary","primary_link","secondary","secondary_link"): L["main"].append(path(r, .5))
    elif h in ("tertiary","tertiary_link","unclassified"): L["mid"].append(path(r))
    elif h in ("residential","service","living_street"): L["res"].append(path(r))
    elif h in ("path","footway","track"): L["path"].append(path(r))
    elif ww == "drain" or ww == "ditch": L["drain"].append(path(r))
    elif ww in ("stream","river","canal"): L["stream"].append(path(r))
    elif nat in ("water",) or t.get("water"): L["water"].append(path(r, .6, True))
    elif nat in ("wetland","mud") : L["wetland"].append(path(r, .6, True))
    elif "building" in t: L["bldg"].append(path(r, .2, True))
for k in L:
    L[k] = [p for p in L[k] if p]
    print(k, len(L[k]), sum(map(len, L[k])) // 1024, "KB")

os.makedirs("scripts/.layers", exist_ok=True)
def svg(name, body):
    open(f"scripts/.layers/{name}.svg", "w").write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {VW} {VH}" width="{VW}" height="{VH}">{body}</svg>')
def stroke(ds, c, w, o=1):
    return f'<path d="{"".join(ds)}" fill="none" stroke="{c}" stroke-width="{w}" stroke-opacity="{o}" stroke-linecap="round" stroke-linejoin="round"/>'
B = L["bldg"]
svg("buildings", "".join(f'<path d="{"".join(B[i:i+1500])}" fill="#fff"/>' for i in range(0, len(B), 1500)))
svg("streets", stroke(L["path"], "#fff", .5, .5) + stroke(L["res"], "#fff", .9) + stroke(L["mid"], "#fff", 1.5))
svg("water", f'<path d="{"".join(L["wetland"])}" fill="#fff" fill-opacity=".35"/><path d="{"".join(L["water"])}" fill="#fff"/>' + stroke(L["stream"], "#fff", 2.2))
svg("drains", stroke(L["drain"], "#fff", 1.1))

places = [{"name": n, "kind": k, "x": round(proj(*c)[0]), "y": round(proj(*c)[1])} for n, k, c in d["places"]]
places = [p for p in places if 0 <= p["x"] <= VW and 0 <= p["y"] <= VH]

# Régions du Cameroun
g = json.load(open(adm, encoding="utf8"))
allp = []
for f in g["features"]:
    c = f["geometry"]["coordinates"]
    polys = c if f["geometry"]["type"] == "MultiPolygon" else [c]
    f["_p"] = polys
    for p in polys: allp += p[0]
x0 = min(p[0] for p in allp); x1 = max(p[0] for p in allp)
y0 = min(p[1] for p in allp); y1 = max(p[1] for p in allp)
CK = 1000 / (y1 - y0)
def cproj(lon, lat): return ((lon - x0) * CK, (y1 - lat) * CK)
regions = []
for f in g["features"]:
    ds = []
    pts_all = []
    for p in f["_p"]:
        pts = [cproj(*q[:2]) for q in p[0]]
        pts_all += pts
        pts = rdp(pts[:-1], .5)
        ds.append("M" + "L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + "Z")
    xs = [p[0] for p in pts_all]; ys = [p[1] for p in pts_all]
    regions.append({"name": f["properties"].get("shapeName"), "d": "".join(ds),
        "bbox": [round(min(xs),1), round(min(ys),1), round(max(xs),1), round(max(ys),1)]})
douala = cproj(9.7394, 4.0944)
out = {
  "vw": VW, "vh": VH, "bounds": {"W": W, "E": E, "N": N, "S": S},
  "main": L["main"], "places": places,
  "country": {"w": round((x1 - x0) * CK), "h": 1000, "regions": regions, "douala": [round(douala[0],1), round(douala[1],1)]},
}
json.dump(out, open("lib/geo.json", "w", encoding="utf8"), ensure_ascii=False)
print("geo.json", os.path.getsize("lib/geo.json") // 1024, "KB")
print([r["name"] for r in regions], out["country"]["w"])
for p in sorted(places, key=lambda p: p["x"]): print(p)
