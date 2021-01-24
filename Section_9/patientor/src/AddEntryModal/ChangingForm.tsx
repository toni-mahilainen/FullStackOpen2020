import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryFormValues, Type } from '../types';
import { HealthCheckInputs, HospitalInputs, OccupationalInputs } from './ChangingInputs';

interface Props {
    initialValues: EntryFormValues;
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
    validate: (values: EntryFormValues) => void | object;
}

const ChangingForm: React.FC<Props> = ({ initialValues, onSubmit, onCancel, validate }) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            {({ isValid, values, setFieldValue, setFieldTouched }) => {
                let changingInputs: JSX.Element = <></>;

                switch (initialValues.type) {
                    case Type.Hospital:
                        changingInputs = <HospitalInputs />;
                        break;

                    case Type.OccupationalHealthcare:
                        changingInputs = <OccupationalInputs />;
                        break;

                    case Type.HealthCheck:
                        changingInputs = <HealthCheckInputs />;
                        break;

                    default:
                        return null;
                }

                return (
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Type"
                            name="type"
                            value={values.type}
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

export default ChangingForm;