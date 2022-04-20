import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { ForceGraph3D } from "react-force-graph";
//@ts-ignore
import { JsonEditor as Editor } from "jsoneditor-react";

import "jsoneditor-react/es/editor.min.css";

import styles from "./GraphTest.module.scss";

type Link = {
	source: string;
	target: string;
};

type Node = {
	id: string;
	value?: any;
};

type Graph = {
	nodes: Node[];
	links: Link[];
};

function convertToNodes(
	obj: Record<string, unknown>,
	nodes: Node[] = [],
	links: Link[] = [],
	path: string = "",
	currentSource: string = ""
): Graph {
	if (typeof obj === "object" && !Array.isArray(obj)) {
		Object.keys(obj).forEach((key) => {
			convertToNodes(
				obj[key] as Record<string, unknown>,
				nodes,
				links,
				(path !== "" ? path + "~" : "") + key,
				key
			);

			if (currentSource !== "") {
				links.push({
					source: currentSource,
					target: key,
				});
			} else {
				links.push({
					source: "root",
					target: key,
				});

				!nodes.some((value) => value.id === "root") &&
					nodes.push({
						id: "root",
					});
			}

			nodes.push({
				id: key,
				value: obj[key],
			});
		});

		return {
			nodes,
			links,
		};
	} else {
		return {
			nodes,
			links,
		};
	}
}

const example = {
	a: {
		b: {
			c: 2,
		},
		d: [2, 3, 4],
	},
	e: {
		f: {
			g: "asdasd",
		},
	},
};

convertToNodes(example);

const GraphTest: React.FC = () => {
	const [graph, setGraph] = useState<Graph>(convertToNodes(example));
	const [loadedFileName, setLoadedFileName] = useState("example");
	const [selectedElement, setSelectedElement] = useState("");
	const [loadedJson, setLoadedJson] =
		useState<Record<string, unknown>>(example);
	const [value, setValue] = useState("");

	useEffect(() => {
		function getValueById(id: string) {
			const node = graph.nodes.find((node) => node.id === id);
			if (typeof node?.value === "object")
				return JSON.stringify(node.value);
			else return node ? node.value : null;
		}

		if (selectedElement) {
			if (selectedElement === "root") setValue(JSON.stringify(graph));

			getValueById(selectedElement);
			setValue(getValueById(selectedElement) ?? "");
		}
	}, [graph.nodes, selectedElement]);

	function handleChange(file: File) {
		if (file.type !== "application/json") return;

		file.text().then((text) => {
			const json = JSON.parse(text);
			setLoadedJson(json);
			setGraph(convertToNodes(json));
			setLoadedFileName(file.name);
		});
	}

	function onEdit(newJson: Record<string, unknown>) {
		setLoadedJson(newJson);
		setGraph(convertToNodes(newJson));
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Graph From Json</h1>

				<FileUploader
					className={styles.dropArea}
					handleChange={handleChange}
				/>

				<Editor value={loadedJson} onChange={onEdit} />

				<section className={styles.loadedFileData}>
					<h3>
						Loaded file: <i>{loadedFileName}</i>
					</h3>

					<div style={{ justifySelf: "flex-start" }}>
						<h4>Element: {selectedElement}</h4>
						<h4 className={styles.currentValue}>Value: {value}</h4>
					</div>
				</section>
			</div>
			<div className={styles.graph}>
				<ForceGraph3D
					graphData={graph}
					height={400}
					width={800}
					nodeLabel="id"
					nodeAutoColorBy="id"
					nodeOpacity={0.7}
					onNodeClick={(node) => {
						setSelectedElement(node.id as string);
					}}
					linkOpacity={0.5}
					linkDirectionalArrowLength={8}
					linkDirectionalArrowRelPos={1}
					linkDirectionalParticles={5}
				/>
			</div>
		</div>
	);
};

export default GraphTest;
