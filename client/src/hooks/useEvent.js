import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEventContext } from "../hooks/useEventContext";
import useFetch from "../hooks/useFetch";

export const useEvent = () => {
  const { token } = useAuthContext();
  const { event, events, setEvent, setEvents } = useEventContext();

  const navigate = useNavigate();

  const useCreateEvent = useFetch("/event", (data) => {
    setEvent(data.event);
    setEvents((events) => [...events, data.event]);
    navigate("/event/" + data.event._id);
  });

  const useGetAllEvents = useFetch("/event", (data) => {
    setEvents(data.events);
  });

  const createEvent = (eventObject) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(eventObject),
    };
    useCreateEvent.performFetch(options);
  };

  const getAllEvents = () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    useGetAllEvents.performFetch(options);
  };

  return {
    create: {
      isLoading: useCreateEvent.isLoading,
      error: useCreateEvent.error,
      perform: createEvent,
      cancel: useCreateEvent.cancelFetch,
    },
    getAll: {
      isLoading: useGetAllEvents.isLoading,
      error: useGetAllEvents.error,
      perform: getAllEvents,
      cancel: useGetAllEvents.cancelFetch,
    },
    event,
    events,
  };
};
