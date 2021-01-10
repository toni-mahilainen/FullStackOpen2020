import React from 'react';
import { Container, Label, List } from 'semantic-ui-react';
import { Diagnosis, Entry } from '../types';

interface Props {
    entriesData: Entry[];
    diagnoses: { [id: string]: Diagnosis };
}

const Entries: React.FC<Props> = ({ entriesData, diagnoses }) => {
    const entries = entriesData.map(entry => {
        const diagnosisCodes = entry.diagnosisCodes?.map(code => {
            const diagnosis = Object.values(diagnoses).find(diagnosis => diagnosis.code === code);
            return (
                <List.Item key={code}>
                    <Label color='green' size='mini'>{code}</Label>{' '}
                    <span>{diagnosis?.name}</span>
                </List.Item>
            );
        });

        return (
            <Container key={entry.id} >
                <Label color='pink'>{entry.date}</Label>{' '}
                <span>{entry.description}</span>
                <List bulleted verticalAlign='middle'>
                    {diagnosisCodes}
                </List>
            </Container>
        );
    });

    return (
        <Container>
            {entries}
        </Container>
    );
};

export default Entries;