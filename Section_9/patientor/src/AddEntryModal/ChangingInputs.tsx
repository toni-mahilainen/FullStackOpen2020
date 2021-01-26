import React from 'react';
import { Field } from "formik";
import { TextField, NumberField } from "../AddPatientModal/FormField";

export const HospitalInputs: React.FC = (): JSX.Element => {
    const validateDischargeDate = (value: string): string => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid date format";
        const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
        let error = '';

        if (!value) {
            error = requiredError;
        } else if (!dateRegex.test(value)) {
            error = invalidDateError;
        }

        return error;
    };

    const validateDischargeCriteria = (value: string): string => {
        const requiredError = "Field is required";
        let error = '';

        if (!value) {
            error = requiredError;
        }

        return error;
    };

    return (
        <>
            <Field
                label="Discharge date"
                placeholder="Discharge date"
                name="discharge.date"
                validate={validateDischargeDate}
                component={TextField}
            />
            <Field
                label="Discharge criteria"
                placeholder="Discharge criteria"
                name="discharge.criteria"
                validate={validateDischargeCriteria}
                component={TextField}
            />
        </>
    );
};

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