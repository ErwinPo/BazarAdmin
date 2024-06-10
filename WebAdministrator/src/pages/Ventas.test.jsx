/*
// Ventas.test.jsx
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Ventas from './Ventas';
import { ToastContainer } from 'react-toastify';

// Mock the fetch function globally
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('Ventas Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Error al tener datos vacios', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Registrar datos validos', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 100 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(fetch).toHaveBeenCalledWith("http://3.144.21.179:8000/bazar/sales//", expect.anything());

    expect(await screen.findByText(/Venta registrada con éxito!/i)).toBeInTheDocument();
  });

  test('Error al tener montos menores a 0', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: -20 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al tener cantidades menores a 0', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 20 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: -10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al tener montos iguales a 0', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 0 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al tener cantidades iguales a 0', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 100 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 0 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Valido al registrar monto de 1', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(fetch).toHaveBeenCalledWith("http://3.144.21.179:8000/bazar/sales//", expect.anything());

    expect(await screen.findByText(/Venta registrada con éxito!/i)).toBeInTheDocument();
  });

  test('Valido al registrar cantidad de 1', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 100 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 1 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(fetch).toHaveBeenCalledWith("http://3.144.21.179:8000/bazar/sales//", expect.anything());

    expect(await screen.findByText(/Venta registrada con éxito!/i)).toBeInTheDocument();
  });

  test('Error al tener montos menores a 1', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 0.99 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al tener cantidades menores a 1', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 99 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 0.99 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al tener montos mayores a 1 millon', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 1000001 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al tener cantidades mayores a 1 millon', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 11 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 1000001 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Valido al registrar montos de 1 millon', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 1000000 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(fetch).toHaveBeenCalledWith("http://3.144.21.179:8000/bazar/sales//", expect.anything());

    expect(await screen.findByText(/Venta registrada con éxito!/i)).toBeInTheDocument();
  });

  test('Valido al registrar cantidades de 1 millon', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 1000000 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(fetch).toHaveBeenCalledWith("http://3.144.21.179:8000/bazar/sales//", expect.anything());

    expect(await screen.findByText(/Venta registrada con éxito!/i)).toBeInTheDocument();
  });

  test('Error al ingresar datos no validos (monto no valido)', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: "efj" } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al ingresar datos no validos (cantidad no valido)', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: "huevo" } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al ingresar datos no validos (monto vacio)', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al ingresar datos no validos (cantidad vacia)', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 10 } });
    
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Error al ingresar monto con 3 o mas valores decimales', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer/>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 3.698 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 10 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(await screen.findByText(/Error: Datos ingresados no validos./i)).toBeInTheDocument();
  });

  test('Valido al registrar monto con 2 valores decimales', async () => {
    render(
      <MemoryRouter>
        <Ventas />
        <ToastContainer />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Monto Total/i), { target: { value: 1.99 } });
    fireEvent.change(screen.getByLabelText(/Número Total de Articulos Vendidos/i), { target: { value: 1 } });
    
    fireEvent.submit(screen.getByRole('button', { name: /registrar venta/i }));

    expect(fetch).toHaveBeenCalledWith("http://3.144.21.179:8000/bazar/sales//", expect.anything());

    expect(await screen.findByText(/Venta registrada con éxito!/i)).toBeInTheDocument();
  });

});
*/