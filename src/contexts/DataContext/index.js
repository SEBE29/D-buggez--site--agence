import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();

      // Trouver l'élément avec la date la plus récente
      const dernier = loadedData.events.reduce((latest, item) => {
        const itemDate = new Date(item.date);
        const latestDate = latest ? new Date(latest.date) : new Date(0); // Date par défaut très ancienne
        return itemDate > latestDate ? item : latest;
      }, null);
      setData(loadedData);
      setLast(dernier);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // Mémoriser la valeur du contexte pour éviter qu'elle ne change à chaque rendu
  const contextValue = useMemo(
    () => ({ data, error, last }),
    [data, error, last]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
