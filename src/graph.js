import React, { useState, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import svg_icons from "./all-svgs";
import ReactDOM from "react-dom";
import { notification } from "antd";
import moment from "moment";
import style from "./styles.css";

import comp_host from "./images/compromised_host.png";
import comp_action from "./images/compromised_action.png";
import comp_hash from "./images/compromised_hash.png";
import comp_object from "./images/compromised_object.png";
import comp_process from "./images/compromised_process.png";
import comp_url from "./images/compromised_url.png";
import comp_user from "./images/compromised_user.png";
// target images
import target_user from "./images/target_user.png";
import target_host from "./images/target_host.png";
import target_action from "./images/target_action.png";
import target_hash from "./images/target_hash.png";
import target_object from "./images/target_object.png";
import target_process from "./images/target_process.png";
import target_url from "./images/target_url.png";
// suspect images
import suspect_user from "./images/suspect_user.png";
import suspect_action from "./images/suspect_action.png";
import suspect_hash from "./images/suspect_hash.png";
import suspect_object from "./images/suspect_object.png";
import suspect_process from "./images/suspect_process.png";
import suspect_url from "./images/suspect_url.png";
import suspect_host from "./images/suspect_host.png";

import frame from "./images/frame.png";
import comp_resource from "./images/Compromised_resource.png";
import target_resource from "./images/target_resource.png";
import suspect_resource from "./images/suspect_resource.png";
// signal image
import signal_stream from "./images/signal.png";

export default function ForceDirectedSignal(props) {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodePosition, setNodePosition] = useState(null);
  const [stopEngine, setStopEngine] = useState(false);
  const [graphData, setGraphData] = useState(props.signalData);

  const getDate = (data, type) => {
    var timeStr;
    if (type === "relative") {
      timeStr = moment(data).startOf("ymd").fromNow();
    } else if (type === "LongDate") {
      timeStr = moment(
        moment(new Date(data * 1000) / 1000).format("YYYY-MM-DDTHH:mm:ss")
      ).format("D MMM YYYY, h:mm A");
    }

    return timeStr;
  };

  const CopyFunction = (statecopy) => {
    navigator.clipboard.writeText(statecopy);
    notification["info"]({
      placement: "bottomRight",
      duration: 4,
      message: "Copied to clipboard",
      description: "Copied to clipboard"
    });
  };

  // finding node position
  const setPosition = (e) => {
    let position = {};
    position.x = e?.pageX;
    position.y = e?.pageY;
    setNodePosition(position);
  };

  useEffect(() => {
    setGraphData(props.signalData);
    fgRef.current.d3Force("charge").distanceMax(100);
  }, [graphData]);

  return (
    <div>
      {selectedNode &&
        ReactDOM.createPortal(
          <div
            className="nodeCard"
            style={{
              position: "absolute",
              margin: "2px 0px 2px 0px",
              left: nodePosition?.x,
              top: nodePosition?.y,
              border:
                selectedNode.group === "signal"
                  ? "2px solid #1fb6c7"
                  : selectedNode.group === "target"
                  ? "2px solid #50ba47"
                  : selectedNode.group === "suspect"
                  ? "2px solid #ba4a3d"
                  : selectedNode.group === "compromised"
                  ? "2px solid #40af41"
                  : null
            }}
          >
            {selectedNode.group === "signal" ? (
              <div>
                <div style={{ display: "flex" }}>
                  <span style={{ maxWidth: "200px", wordBreak: "break-word" }}>
                    <strong>{selectedNode.DetectionName.toUpperCase()}</strong>
                  </span>
                  <span
                    className="titleDate"
                    style={{
                      marginRight: "10px"
                    }}
                  >
                    {" - "}
                    {getDate(selectedNode.CNAMTime, "LongDate")}
                  </span>
                  {!selectedNode.current_case && (
                    <span
                      style={{ cursor: "pointer", marginLeft: "auto" }}
                      onClick={() => {}}
                    >
                      <i className="fal fa-folder-plus" />
                    </span>
                  )}
                </div>
                <div className="tacticTechnic">
                  <span
                  // className="hoverElements}
                  >
                    {selectedNode.DetectionTactic.toUpperCase()}
                  </span>{" "}
                  /{" "}
                  <span
                  // className="hoverElements}
                  >
                    {selectedNode.DetectionTechnique}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex" }}>
                  <span style={{ color: "#757575" }}>
                    {selectedNode.group.toUpperCase()}
                  </span>{" "}
                  {!selectedNode.current_case && (
                    <span
                      style={{ cursor: "pointer", marginLeft: "auto" }}
                      onClick={() => {}}
                    >
                      <i className="fal fa-folder-plus" />
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {selectedNode.group === "target"
                    ? selectedNode.field === "Host"
                      ? svg_icons.target_host
                      : selectedNode.field === "User"
                      ? svg_icons.target_user
                      : selectedNode.field === "Action"
                      ? svg_icons.target_action
                      : selectedNode.field === "Process"
                      ? svg_icons.target_process
                      : selectedNode.field === "Url"
                      ? svg_icons.target_url
                      : selectedNode.field === "Hash"
                      ? svg_icons.target_hash
                      : selectedNode.field === "Object"
                      ? svg_icons.target_object
                      : selectedNode.field === "Resource"
                      ? svg_icons.target_resource
                      : null
                    : null}
                  {selectedNode.group === "suspect"
                    ? selectedNode.field === "Host"
                      ? svg_icons.suspect_host
                      : selectedNode.field === "User"
                      ? svg_icons.suspect_user
                      : selectedNode.field === "Action"
                      ? svg_icons.suspect_action
                      : selectedNode.field === "Process"
                      ? svg_icons.suspect_process
                      : selectedNode.field === "Url"
                      ? svg_icons.suspect_url
                      : selectedNode.field === "Hash"
                      ? svg_icons.suspect_hash
                      : selectedNode.field === "Object"
                      ? svg_icons.suspect_object
                      : selectedNode.field === "Resource"
                      ? svg_icons.suspect_resource
                      : null
                    : null}

                  {selectedNode.group === "compromised"
                    ? selectedNode.field === "Host"
                      ? svg_icons.comp_host
                      : selectedNode.field === "User"
                      ? svg_icons.comp_user
                      : selectedNode.field === "Action"
                      ? svg_icons.comp_action
                      : selectedNode.field === "Process"
                      ? svg_icons.comp_process
                      : selectedNode.field === "Url"
                      ? svg_icons.comp_url
                      : selectedNode.field === "Hash"
                      ? svg_icons.comp_hash
                      : selectedNode.field === "Object"
                      ? svg_icons.comp_object
                      : selectedNode.field === "Resource"
                      ? svg_icons.comp_resource
                      : null
                    : null}
                  <div
                    className="hoverItem"
                    style={{
                      fontWeight: "bold",
                      display: "flex",
                      cursor: "pointer"
                    }}
                  >
                    <span
                      className="entityInNode"
                      onClick={() => {
                        if (selectedNode) props.openUserPanel(selectedNode);
                      }}
                    >
                      {selectedNode.id}
                    </span>
                    <div className="copyToClipboard">
                      <i
                        className="fad fa-copy"
                        onClick={() => CopyFunction(selectedNode.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>,
          document.body
        )}
      <div onMouseMove={setPosition}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          backgroundColor={"#18191d"}
          height="700"
          width="1000"
          nodeId="id"
          autoPauseRedraw={false}
          onNodeHover={(node) => {
            if (node) {
              setSelectedNode(node);
            } else {
              setSelectedNode(null);
            }
          }}
          onNodeClick={(node, event) => {
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(6, 1000);
          }}
          onNodeDrag={(node) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          onNodeDragEnd={(node) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          nodeCanvasObject={(node, ctx) => {
            const size = 15;
            const img = new Image();
            ctx.beginPath();
            if (node.group !== "signal") {
              const label = node.id;
              const textWidth = ctx.measureText(label).width;
              const bgDimensions = [textWidth, 2].map((n) => n + 10 * 0.2); // for padding
              ctx.fillStyle = "#2d343c"; //background color for tag
              const fillY = node.current_case
                ? node.y - bgDimensions[1] / 2 + 10.5
                : node.y - bgDimensions[1] / 2 + 9.5;
              ctx.fillRect(
                node.x - bgDimensions[0] / 2 + 1.3,
                fillY,
                ...bgDimensions
              );
              const y = node.current_case ? node.y + 11.1 : node.y + 10.1;
              // for text styling
              ctx.font = `3px mukta`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#d3d3d3"; //node.color;
              ctx.fillText(label, node.x + 1.3, y);
            }

            // for highlighting
            const outline = new Image();
            outline.src = node.current_case === true ? frame : null;
            ctx.drawImage(
              outline,
              node.x - size / 2 - 1.9,
              node.y - size / 2 - 2.8,
              size + 6,
              size + 7
            ); //frame image

            img.src =
              node.group === "compromised"
                ? node.field === "Host"
                  ? comp_host
                  : node.field === "User"
                  ? comp_user
                  : node.field === "Action"
                  ? comp_action
                  : node.field === "Process"
                  ? comp_process
                  : node.field === "Hash"
                  ? comp_hash
                  : node.field === "Object"
                  ? comp_object
                  : node.field === "Url"
                  ? comp_url
                  : node.field === "Resource"
                  ? comp_resource
                  : null
                : node.group === "signal"
                ? signal_stream
                : node.group === "target"
                ? node.field === "User"
                  ? target_user
                  : node.field === "Host"
                  ? target_host
                  : node.field === "Action"
                  ? target_action
                  : node.field === "Process"
                  ? target_process
                  : node.field === "Hash"
                  ? target_hash
                  : node.field === "Object"
                  ? target_object
                  : node.field === "Url"
                  ? target_url
                  : node.field === "Resource"
                  ? target_resource
                  : null
                : node.group === "suspect"
                ? node.field === "Host"
                  ? suspect_host
                  : node.field === "User"
                  ? suspect_user
                  : node.field === "Action"
                  ? suspect_action
                  : node.field === "Process"
                  ? suspect_process
                  : node.field === "Hash"
                  ? suspect_hash
                  : node.field === "Object"
                  ? suspect_object
                  : node.field === "Url"
                  ? suspect_url
                  : node.field === "Resource"
                  ? suspect_resource
                  : null
                : null;
            node.img = img;
            ctx.drawImage(
              img,
              node.x - size / 2,
              node.y - size / 2,
              size + 1,
              size
            );
            return ctx;
          }}
          maxZoom={10}
          onEngineStop={() => {
            if (!stopEngine) {
              fgRef.current.zoomToFit(1000, 50);
              setStopEngine(true);
            }
          }}
          cooldownTicks={100}
          linkColor={(link) => (link.current_case ? "#555" : "#555")}
          linkDirectionalParticles={4}
          linkWidth={(link) => (link.current_case ? 3 : 1)}
          linkDirectionalParticleColor={() => "#ea671b"}
          linkLineDash={(link) => (!link.current_case ? [2, 1] : null)}
          linkDirectionalParticleWidth={(link) =>
            link.current_case && props.type === "cases"
              ? 4
              : props.type === "signals"
              ? 3
              : 0
          }
          linkDirectionalParticleSpeed={() => 1 * 0.01}
          // linkDirectionalArrowLength={link =>
          //   !link.current_case && props.type === 'cases' ? 2 : 0
          // }
          // linkDirectionalArrowRelPos={() => 0.8}
          // linkDirectionalArrowColor={() => '#757575'}
        />
      </div>
    </div>
  );
}
