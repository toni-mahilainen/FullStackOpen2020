import React from 'react';
import { Container, Label, List } from 'semantic-ui-react';
import { Diagnosis, Entry } from '../types';
import EntryDetails from './EntryDetails';

interface Props {
    entriesData: Entry[];
    diagnoses: { [id: string]: Diagnosis };
}

const Entries: React.FC<Props> = ({ entriesData, diagnoses }) => {
    console.log('entriesData', entriesData);
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
            <EntryDetails key={entry.id} entry={entry} diagnosisCodes={diagnosisCodes} />
        );
    });

    return (
        <Container>
            {entries}
        </Container>
    );
};

export default Entries;