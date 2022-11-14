import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEventContext } from "../hooks/useEventContext";
import useFetch from "../hooks/useFetch";

export const useEvent = () => {
  const { token } = useAuthContext();
  const { event, events, setEvent, setEvents } = useEventContext();
  const { eventId } = useParams();

  const navigate = useNavigate();

  const useCreateEvent = useFetch("/event", (data) => {
    setEvent(data.event);
    setEvents((events) => [...events, data.event]);
    navigate("/event/" + data.event._id);
  });

  const useGetAllEvents = useFetch("/event", (data) => {
    setEvents(data.events);
  });

  const useGetEvent = useFetch(`/event/${eventId}`, (data) => {
    setEvent(data.event);
    setEvents((events) => [...events, data.event]);
  });

  const getEvent = () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    useGetEvent.performFetch(options);
  };

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
      isSuccess: useCreateEvent.isSuccess,
    },
    getAll: {
      isLoading: useGetAllEvents.isLoading,
      error: useGetAllEvents.error,
      perform: getAllEvents,
      cancel: useGetAllEvents.cancelFetch,
    },
    getOneEvent: {
      isLoading: useGetEvent.isLoading,
      error: useGetEvent.error,
      perform: getEvent,
      cancel: useGetEvent.cancelFetch,
      isSuccess: useGetEvent.isSuccess,
    },
    event,
    events,
  };
};
