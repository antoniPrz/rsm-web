// src/components/RepairsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddRepairModal from './AddRepairModal';

const RepairsList = () => {
    const [repairs, setRepairs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchRepairs = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/repairs');
            setRepairs(response.data);
        } catch (error) {
            console.error('Error fetching repairs:', error);
        }
    };

    const handleAddRepair = () => {
        fetchRepairs(); // Refresca la lista de reparaciones cuando se agrega una nueva
    };

    useEffect(() => {
        fetchRepairs();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Reparaciones</h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={() => setIsModalOpen(true)}
            >
                Nueva Reparación
            </button>

            {/* Ajustamos el contenedor de la tabla para ser responsive */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/4 py-3 px-4 text-left">Modelo</th>
                            <th className="w-1/4 py-3 px-4 text-left">Número de Serie</th>
                            <th className="w-1/2 py-3 px-4 text-left">Problema Reportado</th>
                            <th className="py-3 px-4 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {repairs.map((repair) => (
                            <tr key={repair.id} className="border-b">
                                <td className="py-3 px-4">{repair.device_model}</td>
                                <td className="py-3 px-4">{repair.serial_number}</td>
                                <td className="py-3 px-4">{repair.reported_issue}</td>
                                <td className="py-3 px-4">
                                    <span className={`py-1 px-3 rounded-full text-xs ${
                                        repair.status === "Completada" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                                    }`}>
                                        {repair.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <AddRepairModal closeModal={() => setIsModalOpen(false)} onAddRepair={handleAddRepair} />
            )}
        </div>
    );
};

export default RepairsList;
