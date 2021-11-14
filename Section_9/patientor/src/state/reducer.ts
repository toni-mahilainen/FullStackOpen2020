import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "FIND_PATIENT";
      payload: { patient: Patient };
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        id: string | undefined;
        newEntry: Entry;
      };
    }
  | {
      type: "RESET_PATIENT";
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: action.payload.reduce(
          (memo, patient) => ({ ...memo, [patient.id]: patient }),
          {}
        ),
      };

    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload.reduce(
          (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
          {}
        ),
      };
    case "FIND_PATIENT":
      return action.payload.patient
        ? {
            ...state,
            patient: action.payload.patient,
          }
        : state;

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };

    case "ADD_ENTRY":
      return {
        ...state,
        // patients: {
        //     ...state.patients,
        //     [action.payload.id]: action.payload
        // }
      };

    case "RESET_PATIENT":
      delete state.patient;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const findPatient = (patient: Patient): Action => {
  return {
    type: "FIND_PATIENT",
    payload: { patient: patient },
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient,
  };
};

export const addEntry = (id: string | undefined, newEntry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      id,
      newEntry,
    },
  };
};

export const resetPatient = (): Action => {
  return {
    type: "RESET_PATIENT",
  };
};
