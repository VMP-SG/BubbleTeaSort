export const POLYGON_HEIGHT = 97;
export const POLYGON_WIDTH = 115;
export const DOT_RADIUS = 2;
export const PADDING = 4;
export const GRAPH_HEIGHT = POLYGON_HEIGHT + DOT_RADIUS * 2 + PADDING * 2;
export const GRAPH_WIDTH = POLYGON_WIDTH + DOT_RADIUS * 2 + PADDING * 2;
export const CENTREX = Math.ceil(GRAPH_WIDTH / 2);
export const CENTREY = Math.ceil(GRAPH_HEIGHT / 2);

// percentages: left, top, right, bottom
export const getCoordinates = (percentages) => {

  const lengthX = CENTREX - 1 - DOT_RADIUS - PADDING;
  const lengthY = CENTREY - 1 - DOT_RADIUS - PADDING;

  
  const max = percentages[0];
  
  const left = Math.floor(percentages[0] / max * lengthX);
  const top = Math.floor(percentages[1] / max * lengthY);
  const right = Math.floor(percentages[2] / max * lengthX);
  const bottom = Math.floor(percentages[3] / max * lengthY);
  
  const leftCoordinates = (CENTREX - 1 - left) + "," + CENTREY;
  const topCoordinates = CENTREX + "," + (CENTREY - 1 - top);
  const rightCoordinates = (CENTREX + 1 + right) + "," + CENTREY;
  const bottomCoordinates = CENTREX + "," + (CENTREY + 1 + bottom);

  return [leftCoordinates, topCoordinates, rightCoordinates, bottomCoordinates];
}

export const parsePolygonCoordinates = (coordinates) => {
  return coordinates.join(" ");
}
