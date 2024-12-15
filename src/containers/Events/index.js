import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9; // Nombre d'événements par page

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Type sélectionné
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  // Filtrer les événements par type
  const filteredEvents = (data?.events || []).filter(
    (event) => !type || event.type === type
  );

  // Pagination : événements affichés sur la page actuelle
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // Calculer le nombre total de pages
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  // Liste unique des types pour le menu déroulant
  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));

  const handleChangeType = (selectedType) => {
    setType(selectedType || null); // Réinitialiser à null si aucune catégorie sélectionnée
    setCurrentPage(1); // Revenir à la première page lors d'un changement de filtre
  };

  return (
    <>
      {error && <div>Une erreur est survenue.</div>}
      {data === null ? (
        "Chargement..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={handleChangeType}
            name="event-filter"
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map((event) => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover}
                      title={event.title}
                      date={new Date(event.date)}
                      label={event.type}
                    />
                  )}
                </Modal>
              ))
            ) : (
              <p>Aucun événement ne correspond à cette catégorie.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="Pagination">
            {Array.from({ length: pageNumber }, (_, n) => (
              <a
                key={n}
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
                className={currentPage === n + 1 ? "active" : ""}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
