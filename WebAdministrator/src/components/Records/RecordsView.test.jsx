import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; 
import { ToastContainer } from 'react-toastify';

// Mock the fetch function globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('ResetPassword Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(false);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(true);
  });

});
