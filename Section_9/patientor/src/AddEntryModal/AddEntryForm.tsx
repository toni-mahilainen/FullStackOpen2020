import { FormikErrors } from 'formik';
import React from 'react';

import { Type, EntryFormValues, HospitalEntryFormValues, OccupationalEntryFormValues, HealthCheckEntryFormValues, HealthCheckRating } from '../types';
import ChangingForm from './ChangingForm';

interface Props {
    type: string;
    onSubmit: (values: EntryFormValues) => void;
    onClose: () => void;
}

const AddEntryForm = ({ type, onSubmit, onClose }: Props) => {
    console.log('onSubmit', onSubmit);

    let initialValues: EntryFormValues = {
        type: 'Hospital',
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
            date: "",
            criteria: ""
        }
    } as HospitalEntryFormValues;

    let validate = (_values: EntryFormValues): object => {
        const errors: FormikErrors<EntryFormValues> = {};
        return errors;
    };

    switch (type) {
        case Type.Hospital:
            initialValues = {
                type: 'Hospital',
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: {
                    date: "",
                    criteria: ""
                }
            };

            validate = (values: EntryFormValues): object => {
                const hospitalEntryValues = values as HospitalEntryFormValues;
                const requiredError = "Field is required";
                const invalidDateError = "Invalid date format";
                const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
                const errors = {
                    type: '',
                    date: '',
                    description: '',
                    specialist: ''
                };

                if (!hospitalEntryValues.date) {
                    errors.date = requiredError;
                } else if (!dateRegex.test(values.date)) {
                    errors.date = invalidDateError;
                }
                if (!hospitalEntryValues.description) {
                    errors.description = requiredError;
                }
                if (!hospitalEntryValues.specialist) {
                    errors.specialist = requiredError;
                }
                
                return errors;
            };

            return <ChangingForm initialValues={initialValues} onSubmit={onSubmit} onClose={onClose} validate={validate} />;

        case Type.OccupationalHealthcare:
            initialValues = {
                type: 'OccupationalHealthcare',
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes: [],
                employerName: '',
                sickLeave: {
                    startDate: "",
                    endDate: ""
                }
            };

            validate = (values: EntryFormValues) => {
                const occupationalHealthcareEntryValues = values as OccupationalEntryFormValues;
                const requiredError = "Field is required";
                const invalidDateError = "Invalid date format";
                const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
                const errors = {
                    type: '',
                    date: '',
                    description: '',
                    specialist: '',
                    employerName: '',
                    sickLeave: {
                        startDate: "",
                        endDate: ""
                    }
                };

                if (!occupationalHealthcareEntryValues.date) {
                    errors.date = requiredError;
                } else if (!dateRegex.test(occupationalHealthcareEntryValues.date)) {
                    errors.date = invalidDateError;
                }
                if (!occupationalHealthcareEntryValues.description) {
                    errors.description = requiredError;
                }
                if (!occupationalHealthcareEntryValues.specialist) {
                    errors.specialist = requiredError;
                }
                if (!occupationalHealthcareEntryValues.employerName) {
                    errors.employerName = requiredError;
                }
                if (!occupationalHealthcareEntryValues.sickLeave.startDate) {
                    errors.sickLeave.startDate = requiredError;
                } else if (!dateRegex.test(occupationalHealthcareEntryValues.sickLeave.startDate)) {
                    errors.sickLeave.startDate = invalidDateError;
                }
                if (!occupationalHealthcareEntryValues.sickLeave.endDate) {
                    errors.sickLeave.endDate = requiredError;
                } else if (!dateRegex.test(occupationalHealthcareEntryValues.sickLeave.endDate)) {
                    errors.sickLeave.endDate = invalidDateError;
                }
                return errors;
            };

            return <ChangingForm initialValues={initialValues} onSubmit={onSubmit} onClose={onClose} validate={validate} />;

        case Type.HealthCheck:
            initialValues = {
                type: 'HealthCheck',
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: HealthCheckRating['Healthy']
            };

            validate = (values: EntryFormValues) => {
                const healthCheckEntryValues = values as HealthCheckEntryFormValues;
                const requiredError = "Field is required";
                const invalidDateError = "Invalid date format";
                const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
                const errors = {
                    type: '',
                    date: '',
                    description: '',
                    specialist: '',
                    healthCheckRating: ''
                };

                if (!healthCheckEntryValues.date) {
                    errors.date = requiredError;
                } else if (!dateRegex.test(healthCheckEntryValues.date)) {
                    errors.date = invalidDateError;
                }
                if (!healthCheckEntryValues.description) {
                    errors.description = requiredError;
                }
                if (!healthCheckEntryValues.specialist) {
                    errors.specialist = requiredError;
                }
                if (!healthCheckEntryValues.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
                }
                return errors;
            };

            return <ChangingForm initialValues={initialValues} onSubmit={onSubmit} onClose={onClose} validate={validate} />;

        default:
            return null;
    }
};

export default AddEntryForm;