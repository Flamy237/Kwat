import geo from "@/lib/geo.json";

/**
 * La carte réelle du secteur, en calques superposés (données OpenStreetMap).
 * Les routes principales restent vectorielles pour pouvoir se dessiner à l'écran.
 */
export default function MapLayers({ drains = true }: { drains?: boolean }) {
  return (
    <>
      <div className="map__layer map__water" data-layer="water" />
      <div className="map__layer map__buildings" data-layer="buildings" />
      <div className="map__layer map__streets" data-layer="streets" />
      {drains && <div className="map__layer map__drains" data-layer="drains" />}
      <svg className="map__main" viewBox={`0 0 ${geo.vw} ${geo.vh}`} aria-hidden="true">
        {geo.main.map((d, i) => (
          <path key={i} d={d} pathLength={1} />
        ))}
      </svg>
    </>
  );
}
