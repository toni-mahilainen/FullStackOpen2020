import React from 'react';

import { Type, EntryFormValues, HospitalEntryFormValues, OccupationalEntryFormValues, HealthCheckEntryFormValues, HealthCheckRating } from '../types';
import ChangingForm from './ChangingForm';

interface Props {
    type: Type.Hospital | Type.OccupationalHealthcare | Type.HealthCheck;
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ type, onSubmit, onCancel }) => {
    let initialValues: EntryFormValues = {
        type: type,
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
            date: "",
            criteria: ""
        }
    };

    let validate: (values: EntryFormValues) => object = () => {
        const errors = {
            type: '',
            date: '',
            description: '',
            specialist: '',
            discharge: {
                date: '',
                criteria: ''
            }
        };
        return errors;
    };
    // const [initialValues, setInitialValues] = useState<EntryFormValues>({
    //     type: Type.Hospital,
    //     date: "",
    //     description: "",
    //     specialist: "",
    //     diagnosisCodes: [],
    //     discharge: {
    //         date: "",
    //         criteria: ""
    //     }
    // });
    // const [validate, setValidate] = useState<(values: EntryFormValues) => object>(() => {
    //     const errors = {
    //         type: '',
    //         date: '',
    //         description: '',
    //         specialist: '',
    //         discharge: {
    //             date: '',
    //             criteria: ''
    //         }
    //     };
    //     return errors;
    // });

    switch (type) {
        case Type.Hospital:
            initialValues = {
                type: type,
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: {
                    date: "",
                    criteria: ""
                }
            };

            validate = (values: EntryFormValues) => {
                const hospitalEntryValues = values as HospitalEntryFormValues;
                const requiredError = "Field is required";
                const invalidDateError = "Invalid date format";
                const dateRegex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i;
                const errors = {
                    type: '',
                    date: '',
                    description: '',
                    specialist: '',
                    discharge: {
                        date: '',
                        criteria: ''
                    }
                };

                if (!hospitalEntryValues.type) {
                    errors.type = requiredError;
                }
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
                if (!hospitalEntryValues.discharge.date) {
                    errors.discharge.date = requiredError;
                } else if (!dateRegex.test(hospitalEntryValues.discharge.date)) {
                    errors.discharge.date = invalidDateError;
                }
                if (!hospitalEntryValues.discharge.criteria) {
                    errors.discharge.criteria = requiredError;
                }
                return errors;
            };

            return <ChangingForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onCancel} validate={validate} />;

        case Type.OccupationalHealthcare:
            initialValues = {
                type: type,
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

                if (!occupationalHealthcareEntryValues.type) {
                    errors.type = requiredError;
                }
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

            return <ChangingForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onCancel} validate={validate} />;

        case Type.HealthCheck:
            initialValues = {
                type: type,
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

                if (!healthCheckEntryValues.type) {
                    errors.type = requiredError;
                }
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

            return <ChangingForm initialValues={initialValues} onSubmit={onSubmit} onCancel={onCancel} validate={validate} />;

        default:
            return null;
    }
};

export default AddEntryForm;