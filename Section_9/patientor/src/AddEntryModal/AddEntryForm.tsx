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
                if (!values.discharge.date) {
                    errors.discharge.date = requiredError;
                } else if (!dateRegex.test(values.discharge.date)) {
                    errors.discharge.date = invalidDateError;
                }
                if (!values.discharge.criteria) {
                    errors.discharge.criteria = requiredError;
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