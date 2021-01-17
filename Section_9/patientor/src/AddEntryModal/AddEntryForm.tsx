import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from '../types';
import { useStateValue } from "../state";

export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

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
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.name = requiredError;
                }
                if (!values.date) {
                    errors.ssn = requiredError;
                }
                if (!values.description) {
                    errors.dateOfBirth = requiredError;
                }
                if (!values.specialist) {
                    errors.occupation = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Type"
                            name="type"
                            component={TextField}
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