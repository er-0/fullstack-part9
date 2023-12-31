import patientData from '../../data/patients-full';

import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from '../types';

import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const patientById = ( id: string ): Patient | undefined => {
  return patients.find((p) => p.id === id );
};

const addPatient = ( entry: NewPatient ): NewPatient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry | undefined => {
  const id = uuid();
  const newEntry = {
    ...entry,
    id,
  };
  const patient = patients.find((patient) => patient.id === patientId);

  if (patient) {
    patient.entries.push(newEntry);
    return newEntry;
  }
  return undefined; // Patient not found
};

export default {
  getEntries,
  getNonSensitiveEntries,
  patientById,
  addPatient,
  addEntry
};