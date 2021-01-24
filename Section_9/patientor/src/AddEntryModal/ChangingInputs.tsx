import React from 'react';
import { Field } from "formik";
import { TextField, NumberField } from "../AddPatientModal/FormField";

export const HospitalInputs: React.FC = (): JSX.Element => (
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

export const OccupationalInputs: React.FC = (): JSX.Element => (
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

export const HealthCheckInputs: React.FC = (): JSX.Element => (
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