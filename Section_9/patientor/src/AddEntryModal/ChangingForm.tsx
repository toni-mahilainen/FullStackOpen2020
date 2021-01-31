import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { EntryFormValues } from '../types';
import ChangingInputs from './ChangingInputs';
import * as yup from "yup";

interface Props {
    initialValues: EntryFormValues;
    onSubmit: (values: EntryFormValues) => void;
    onClose: () => void;
    validationSchema: yup.AnySchema;
}

// const typeOptions: TypeOption[] = [
//     { label: Type.Hospital, value: Type.Hospital },
//     { label: Type.OccupationalHealthcare, value: Type.OccupationalHealthcare },
//     { label: Type.HealthCheck, value: Type.HealthCheck }
// ];

const ChangingForm = ({ initialValues, onSubmit, onClose, validationSchema }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                // let changingInputs: JSX.Element = <></>;

                // switch (initialValues.type) {
                //     case Type.Hospital:
                //         changingInputs = <HospitalInputs />;
                //         break;

                //     case Type.OccupationalHealthcare:
                //         changingInputs = <OccupationalInputs />;
                //         break;

                //     case Type.HealthCheck:
                //         changingInputs = <HealthCheckInputs />;
                //         break;

                //     default:
                //         return null;
                // }

                return (
                    <Form className="form ui">
                        {/* <Field
                            label="Type"
                            placeholder="Type"
                            name="type"
                            value={values.type}
                            component={TextField}
                        /> */}
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
                        <ChangingInputs type={initialValues.type} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onClose} color="red">
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

export default ChangingForm;