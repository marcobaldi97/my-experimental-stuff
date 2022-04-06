import React, { useCallback, useEffect, useState } from "react";

import styles from "./carousel.module.scss";

export default function Carousel(props: { children?: React.ReactNode }) {
	const [launches, setLaunches] = useState<any[]>([]);
	const [currentView, setCurrentView] = useState<number | undefined>(0);

	const onPrevClick = useCallback(() => {
		if (currentView === undefined) return;

		if (currentView === 0) setCurrentView(launches.length - 1);
		else setCurrentView((currentView as number) - 1);
		console.log(currentView);
	}, [currentView, launches.length]);

	const onNextClick = useCallback(() => {
		if (currentView === undefined) return;

		if ((currentView as number) > launches.length - 1) setCurrentView(0);
		else setCurrentView((currentView as number) + 1);
	}, [currentView, launches.length]);

	useEffect(() => {
		if (window.sessionStorage.getItem("spaceX-launches")) {
			setLaunches(
				JSON.parse(
					window.sessionStorage.getItem("spaceX-launches") ?? "[]"
				)
			);
		} else {
			const requestOptions = {
				method: "GET",
			};

			fetch("https://api.spacexdata.com/v5/launches", requestOptions)
				.then((response) => response.text())
				.then((result) => {
					console.log(result);
					setLaunches(JSON.parse(result));
				})
				.catch((error) => console.log("error", error));
		}
	}, []);

	useEffect(() => {
		if (launches.length > 0) {
			setCurrentView(0);
			onNextClick();
			window.sessionStorage.setItem(
				"spaceX-launches",
				JSON.stringify(launches)
			);
		}
	}, [launches]);

	useEffect(() => {
		if (currentView) {
			console.log(currentView);

			const timeout = window.setTimeout(() => {
				onNextClick();
			}, 7000);
			return () => window.clearTimeout(timeout);
		}
	}, [currentView]);

	return (
		<section className={styles.container}>
			<button className={styles.cbutton} onClick={onPrevClick}>
				⬅
			</button>
			<div>
				{currentView && launches[currentView] ? (
					<div className={styles.launches}>
						<img
							src={launches[currentView].links?.patch?.small}
							alt={"🚀"}
						/>
						{launches[currentView].success ? (
							<h3 style={{ color: "green" }}>Success</h3>
						) : (
							<h3 style={{ color: "red" }}>Failure</h3>
						)}
					</div>
				) : (
					<div className={styles.loader} />
				)}
			</div>
			<button className={styles.cbutton} onClick={onNextClick}>
				➡
			</button>
		</section>
	);
}
