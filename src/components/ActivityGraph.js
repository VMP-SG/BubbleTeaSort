import React from "react";
import { Svg, Line, Polygon, Circle } from "react-native-svg";
import {
  CENTREX,
  CENTREY,
  DOT_RADIUS,
  PADDING,
  POLYGON_WIDTH,
  POLYGON_HEIGHT,
  GRAPH_WIDTH,
  GRAPH_HEIGHT,
  getCoordinates,
  parsePolygonCoordinates,
} from "../utils/activityGraph";

const ActivityGraph = ({ percentages }) => {
  const coordinates = getCoordinates(percentages);

  return (
    <Svg height={GRAPH_HEIGHT} width={GRAPH_WIDTH}>
      <Line
        x1={CENTREX}
        x2={CENTREX}
        y1={DOT_RADIUS + PADDING}
        y2={DOT_RADIUS + PADDING + POLYGON_HEIGHT}
        stroke="#402F1F"
      />
      <Line
        y1={CENTREY}
        y2={CENTREY}
        x1={DOT_RADIUS + PADDING}
        x2={DOT_RADIUS + PADDING + POLYGON_WIDTH}
        stroke="#402F1F"
      />
      <Polygon
        points={parsePolygonCoordinates(coordinates)}
        fill="#7D6347B3"
        stroke="black"
        strokeWidth={1}
      />
      {coordinates.map((coordinate, i) => (
        <Circle
          cx={coordinate.split(",")[0]}
          cy={coordinate.split(",")[1]}
          r={2}
          fill="#EADAC1"
          stroke="#402F1F"
          strokeWidth={1}
          key={i}
        />
      ))}
    </Svg>
  );
};

export default ActivityGraph;
