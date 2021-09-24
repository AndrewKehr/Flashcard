import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";
import CardStudy from "./CardStudy";

function Study() {
	const [selectedDeck, setSelectedDeck] = useState({ cards: [] });
	const { deckId } = useParams();
	console.log(deckId);

	useEffect(() => {
		const abortController = new AbortController();

		async function fetchDecks() {
			const decksData = await readDeck(deckId, abortController.signal);
			setSelectedDeck(decksData);
		}
		fetchDecks();
		return () => abortController.abort();
	}, [deckId]);

	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="/">Home</a>
					</li>
					<li class="breadcrumb-item">
						<a href={`/decks/${deckId}`}>{selectedDeck.name}</a>
					</li>
					<li class="breadcrumb-item active" aria-current="page">
						Study
					</li>
				</ol>
			</nav>
			<h1>Study: {selectedDeck.name}</h1>
			<CardStudy selectedDeck={selectedDeck} />
		</div>
	);
}

export default Study;
