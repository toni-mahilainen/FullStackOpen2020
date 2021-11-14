import React from "react";
import { Field } from "formik";
import { TextField, NumberField } from "../AddPatientModal/FormField";
import { Type } from "../types";

interface Props {
  type: "Hospital" | "OccupationalHealthcare" | "HealthCheck";
}

const ChangingInputs = ({ type }: Props) => {
  switch (type) {
    case Type.Hospital:
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="Discharge date"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge criteria"
            placeholder="Discharge criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );

    case Type.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sickleave - Start date"
            placeholder="Start date"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sickleave - End date"
            placeholder="End date"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );

    case Type.HealthCheck:
      return (
        <>
          <Field
            label="Health check rating"
            name="healthCheckRating"
            min={0}
            max={3}
            component={NumberField}
          />
        </>
      );

    default:
      return null;
  }
};

export default ChangingInputs;
