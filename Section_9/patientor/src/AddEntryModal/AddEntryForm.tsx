import React, { FC } from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, SelectField, TypeOption } from "../AddPatientModal/FormField";
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, Type } from '../types';
import { useStateValue } from "../state";
import { HealthCheckInputs, HospitalInputs, OccupationalInputs } from './ChangingInputs';

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: HospitalEntryFormValues | OccupationalEntryFormValues | HealthCheckEntryFormValues) => void;
    onCancel: () => void;
}

const typeOptions: TypeOption[] = [
    { value: Type.Hospital, label: 'Hospital' },
    { value: Type.OccupationalHealthcare, label: 'Occupational Healthcare' },
    { value: Type.HealthCheck, label: 'Health Check' }
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "Hospital",
                date: "",
                description: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: {
                    date: "",
                    criteria: ""
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
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

                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                } else if (!dateRegex.test(values.date)) {
                    errors.date = invalidDateError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                // if (!values.discharge.date) {
                //     errors.discharge.date = requiredError;
                // } else if (!dateRegex.test(values.discharge.date)) {
                //     errors.discharge.date = invalidDateError;
                // }
                // if (!values.discharge.criteria) {
                //     errors.discharge.criteria = requiredError;
                // }
                return errors;
            }}
        >
            {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
                let changingInputs: JSX.Element = <></>;
                
                switch (values.type) {
                    case 'Hospital':
                        changingInputs = <HospitalInputs />;
                        break;

                    case 'OccupationalHealthcare':
                        changingInputs = <OccupationalInputs />;
                        break;

                    case 'HealthCheck':
                        changingInputs = <HealthCheckInputs />;
                        break;

                    default:
                        return null;
                }

                return (
                    <Form className="form ui">
                        <SelectField
                            label="Type"
                            name="type"
                            options={typeOptions}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        {changingInputs}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;