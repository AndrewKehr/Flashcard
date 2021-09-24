import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import DeckForm from "./DeckForm";

function EditDeck() {
	const { deckId } = useParams();
	const [deck, setDeck] = useState({});

	useEffect(() => {
		const abortController = new AbortController();
		async function fetchOneDeck() {
			const response = await readDeck(deckId, abortController.signal);
			setDeck(response);
		}
		fetchOneDeck();
	}, [deckId]);

	return (
		<div>
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/">Home</Link>
					</li>
					<li className="breadcrumb-item">
						<Link to={`/decks/${deckId}`}>{deck.name}</Link>
					</li>
					<li className="breadcrumb-item active" aria-current="page">
						Edit Deck
					</li>
				</ol>
			</nav>

			<DeckForm
				editDesc={deck.description}
				editName={deck.name}
				editId={deckId}
				isNew={false}
			/>
		</div>
	);
}

export default EditDeck;
