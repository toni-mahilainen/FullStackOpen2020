import React from "react";
import * as yup from "yup";

import { Type, EntryFormValues, HealthCheckRating } from "../types";
import ChangingForm from "./ChangingForm";

interface Props {
  type: string;
  onSubmit: (values: EntryFormValues) => void;
  onClose: () => void;
}

const AddEntryForm = ({ type, onSubmit, onClose }: Props) => {
  const baseinitialValues = {
    date: "",
    description: "",
    specialist: "",
    diagnosisCodes: [],
  };

  const hospitalinitialValues: EntryFormValues = {
    ...baseinitialValues,
    type: Type.Hospital,
    discharge: {
      date: "",
      criteria: "",
    },
  };

  const occupationalHealthcareInitialValues: EntryFormValues = {
    ...baseinitialValues,
    type: Type.OccupationalHealthcare,
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
  };

  const healthCheckInitialValues: EntryFormValues = {
    ...baseinitialValues,
    type: Type.HealthCheck,
    healthCheckRating: HealthCheckRating["Healthy"],
  };

  const baseSchema = yup.object().shape({
    description: yup.string().min(12).required(),
    date: yup
      .string()
      .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
      .required(),
    specialist: yup
      .string()
      .min(6, "Specialist must be at least 6 characters")
      .required(),
    diagnosisCodes: yup.array().of(yup.string()),
  });

  const healthCheckSchema = baseSchema.concat(
    yup.object().shape({
      healthCheckRating: yup
        .number()
        .typeError("Health check rating must be a number")
        .min(0, "Health check rating must be greater than or equal to 0")
        .max(3, "Health check rating must be less than or equal to 3")
        .required("Please enter a rating from 0 (great) - 3 (critical)"),
    })
  );

  const occupationalHealthCareSchema = baseSchema.concat(
    yup.object().shape({
      employerName: yup.string().min(3).required(),
      sickLeave: yup.object().shape({
        startDate: yup
          .string()
          .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
        endDate: yup
          .string()
          .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD"),
      }),
    })
  );

  const hospitalSchema = baseSchema.concat(
    yup.object().shape({
      discharge: yup
        .object({
          date: yup
            .string()
            .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
            .required("Discharge date is a required field"),
          criteria: yup
            .string()
            .min(12, "Discharge criteria must be at least 12 characters")
            .required("Discharge criteria is a required field"),
        })
        .required(),
    })
  );

  const entryForm = () => {
    switch (type) {
      case Type.Hospital:
        return (
          <ChangingForm
            initialValues={hospitalinitialValues}
            onSubmit={onSubmit}
            onClose={onClose}
            validationSchema={hospitalSchema}
          />
        );

      case Type.OccupationalHealthcare:
        return (
          <ChangingForm
            initialValues={occupationalHealthcareInitialValues}
            onSubmit={onSubmit}
            onClose={onClose}
            validationSchema={occupationalHealthCareSchema}
          />
        );

      case Type.HealthCheck:
        return (
          <ChangingForm
            initialValues={healthCheckInitialValues}
            onSubmit={onSubmit}
            onClose={onClose}
            validationSchema={healthCheckSchema}
          />
        );

      default:
        return null;
    }
  };

  return <>{entryForm()}</>;
};

export default AddEntryForm;
