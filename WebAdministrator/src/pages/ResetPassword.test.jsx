// ResetPassword.test.jsx
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom'; 
import ResetPassword from './ResetPassword';
import Login from '../components/Login/Login'; 
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

  test('Error: Contraseñas vacias', async () => {
    render(
      <MemoryRouter initialEntries={[`/reset-password/uid/token`]}>
        <Routes>
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.submit(screen.getByRole('button', { name: /cambiar/i }));

    expect(await screen.findByText(/Error: Contraseña no valida./i)).toBeInTheDocument();
  });

  test('Error: Las contraseñas no coinciden', async () => {
    render(
      <MemoryRouter initialEntries={[`/reset-password/uid/token`]}>
        <Routes>
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("password-input"), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: 'Password321' } });

    fireEvent.submit(screen.getByRole('button', { name: /cambiar/i }));

    expect(await screen.findByText(/Error: Las Contraseñas no coinciden./i)).toBeInTheDocument();
  });

  test('Error: Las contraseñas con menos de 8 caracteres', async () => {
    render(
      <MemoryRouter initialEntries={[`/reset-password/uid/token`]}>
        <Routes>
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("password-input"), { target: { value: 'Pass123' } });
    fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: 'Pass123' } });

    fireEvent.submit(screen.getByRole('button', { name: /cambiar/i }));

    expect(await screen.findByText(/Error: Contraseña no valida./i)).toBeInTheDocument();
  });

  test('Error: Las contraseñas son unicamente numericas', async () => {
    render(
      <MemoryRouter initialEntries={[`/reset-password/uid/token`]}>
        <Routes>
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("password-input"), { target: { value: '12345678' } });
    fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: '12345678' } });

    fireEvent.submit(screen.getByRole('button', { name: /cambiar/i }));

    expect(await screen.findByText(/Error: Contraseña no valida./i)).toBeInTheDocument();
  });

  test('Valido: Las contraseñas coinciden', async () => {
    expect(true).toBe(false);
  });

  /*test('should submit the form and display success toast if form is valid and passwords match', async () => {
    render(
      <MemoryRouter initialEntries={[`/reset-password/uid/token`]}>
        <Routes>
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
          <Route path="/" element={<Login />} />
        </Routes>
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId("password-input"), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByTestId("confirm-password-input"), { target: { value: 'Password123' } });

    fireEvent.submit(screen.getByRole('button', { name: /cambiar/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://3.144.21.179:8000/bazar/password-reset-confirm/uid/token/",
        expect.anything()
      );
    });

    //expect(await screen.findByText(/Error al cambiar la contraseña/i)).toBeInTheDocument();
    expect(true).toBe(true);
  });*/

});
