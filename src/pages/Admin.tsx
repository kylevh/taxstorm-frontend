import { useState, useEffect } from 'react';
import { Table, Button, Grid, GridContainer } from "@trussworks/react-uswds";
import { useAppSelector } from '../store/hooks';
import axios from 'axios'

interface Credit {
    id: number;
    name: string;
    value: number;
}

interface Deduction {
    id: number;
    name: string;
    rate: number;
}

export default function Admin() {
    const [credits, setCredits] = useState<Credit[]>([]);
    const [deductions, setDeductions] = useState<Deduction[]>([]);
    const [editingCreditId, setEditingCreditId] = useState<number | null>(null);
    const [editCreditFormData, setEditCreditFormData] = useState<Credit | null>(null);
    const [newCreditData, setNewCreditData] = useState({ name: '', value: 0 });
    const [editingDeductionId, setEditingDeductionId] = useState<number | null>(null);
    const [editDeductionFormData, setEditDeductionFormData] = useState<Deduction | null>(null);
    const [newDeductionData, setNewDeductionData] = useState({ name: '', rate: 0 });

    const token = useAppSelector((state: any) => state.user.token);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get(`http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/credits`, { headers: { Authorization: `Basic ${token}` } });
                setCredits(response.data);
            } catch (error) {
                console.error('Failed to fetch credits', error);
            }
        };

        const fetchDeductions = async () => {
            try {
                const response = await axios.get('http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/deductions', { headers: { Authorization: `Basic ${token}` } });
                setDeductions(response.data);
            } catch (error) {
                console.error('Failed to fetch deductions', error);
            }
        };

        fetchCredits();
        fetchDeductions();
    }, []);

    const handleEditClick = (credit: Credit) => {
        setEditingCreditId(credit.id);
        setEditCreditFormData({ ...credit });
    };

    const handleCancelClick = () => {
        setEditingCreditId(null);
        setEditCreditFormData(null);
    };

    const handleAddCredit = async () => {
        try {
            const response = await axios.post('http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/credits', newCreditData, {
                headers: { Authorization: `Basic ${token}` }
            });
            setCredits([...credits, response.data]);
            setNewCreditData({ name: '', value: 0 }); // Reset form
        } catch (error) {
            console.error('Failed to add new credit', error);
        }
    };

    const deleteCredit = async (creditId: number) => {
        try {
            await axios.delete(`http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/credits/${creditId}`, {
                headers: { Authorization: `Basic ${token}` }
            });
            const updatedCredits = credits.filter(credit => credit.id !== creditId);
            setCredits(updatedCredits);
        } catch (error) {
            console.error('Failed to delete credit', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/credits/${editingCreditId}`, editCreditFormData, {
                headers: { Authorization: `Basic ${token}` }
            });
            const updatedCredits = credits.map(credit => credit.id === editingCreditId ? response.data : credit);
            setCredits(updatedCredits);
            setEditingCreditId(null);
            setEditCreditFormData(null);
        } catch (error) {
            console.error('Failed to update credit', error);
        }
    };

    const handleEditDeductionClick = (deduction: Deduction) => {
        setEditingDeductionId(deduction.id);
        setEditDeductionFormData({ ...deduction });
    };

    const handleCancelDeductionClick = () => {
        setEditingDeductionId(null);
        setEditDeductionFormData(null);
    };

    const handleSaveDeductionClick = async (deductionId: number) => {
        try {
            const response = await axios.put(`http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/deductions/${deductionId}`, editDeductionFormData, {
                headers: { Authorization: `Basic ${token}` }
            });
            const updatedDeductions = deductions.map(deduction => deduction.id === deductionId ? response.data : deduction);
            setDeductions(updatedDeductions);
            setEditingDeductionId(null);
            setEditDeductionFormData(null);
        } catch (error) {
            console.error('Failed to update deduction', error);
        }
    };

    const deleteDeduction = async (deductionId: number) => {
        try {
            await axios.delete(`http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/deductions/${deductionId}`, {
                headers: { Authorization: `Basic ${token}` }
            });
            const updatedDeductions = deductions.filter(deduction => deduction.id !== deductionId);
            setDeductions(updatedDeductions);
        } catch (error) {
            console.error('Failed to delete deduction', error);
        }
    };

    const handleAddDeduction = async () => {
        try {
            const response = await axios.post('http://ec2-54-88-54-136.compute-1.amazonaws.com:8080/taxstorm/deductions', newDeductionData, {
                headers: { Authorization: `Basic ${token}` }
            });
            setDeductions([...deductions, response.data]);
            setNewDeductionData({ name: '', rate: 0 }); // Reset form
        } catch (error) {
            console.error('Failed to add new deduction', error);
        }
    };

    return (
        <main style={{ height: 'calc(100vh - 190px)' }} className="main-content">
            <GridContainer className="usa-section">
                <Grid row={true}>
                    <Grid col={12}>
                        <Table bordered caption="Edit taxes and deductions" fullWidth>
                            <thead>
                                <tr>
                                    <th scope="col">Tax Credit Name</th>
                                    <th scope="col">Tax Credit Value</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {credits.map((credit) => (
                                    <tr key={credit.id}>
                                        <td>
                                            {editingCreditId === credit.id ? (
                                                <input type="text" className="usa-input" value={editCreditFormData?.name} onChange={(e) => {if(editCreditFormData) {setEditCreditFormData({ ...editCreditFormData, name: e.target.value })}}} />
                                            ) : (
                                                credit.name
                                            )}
                                        </td>
                                        <td>
                                            {editingCreditId === credit.id ? (
                                                <input type="number" className="usa-input" value={editCreditFormData?.value} onChange={(e) => {if(editCreditFormData) {setEditCreditFormData({ ...editCreditFormData, value: parseFloat(e.target.value) })}}} />
                                            ) : (
                                                credit.value
                                            )}
                                        </td>
                                        <td>
                                            {editingCreditId === credit.id ? (
                                                <>
                                                    <Button onClick={handleSaveClick} type="button">Save</Button>
                                                    <Button onClick={handleCancelClick} type="button">Cancel</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button onClick={() => handleEditClick(credit)} type="button">Edit</Button>
                                                    <Button onClick={() => deleteCredit(credit.id)} type="button">Delete</Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            value={newCreditData.name}
                                            onChange={(e) => setNewCreditData({ ...newCreditData, name: e.target.value })}
                                            placeholder="Enter credit name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={newCreditData.value}
                                            onChange={(e) => setNewCreditData({ ...newCreditData, value: parseFloat(e.target.value) })}
                                            placeholder="Enter credit value"
                                        />
                                    </td>
                                    <td>
                                        <Button onClick={handleAddCredit} type="button">Add Credit</Button>
                                    </td>
                                </tr>

                            </tbody>
                        </Table>

                        <Table bordered caption="Edit Deductions" fullWidth>
                            <thead>
                                <tr>
                                    <th scope="col">Deduction Name</th>
                                    <th scope="col">Deduction Rate</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deductions.map((deduction) => (
                                    <tr key={deduction.id}>
                                        <td>
                                            {editingDeductionId === deduction.id ? (
                                                <input type="text" className="usa-input" value={editDeductionFormData?.name} onChange={(e) => {if(editDeductionFormData) {setEditDeductionFormData({ ...editDeductionFormData, name: e.target.value })}}} />
                                            ) : (
                                                deduction.name
                                            )}
                                        </td>
                                        <td>
                                            {editingDeductionId === deduction.id ? (
                                                <input type="number" className="usa-input" value={editDeductionFormData?.rate} onChange={(e) => {if(editDeductionFormData) {setEditDeductionFormData({ ...editDeductionFormData, rate: parseFloat(e.target.value) })}}} />
                                            ) : (
                                                deduction.rate
                                            )}
                                        </td>
                                        <td>
                                            {editingDeductionId === deduction.id ? (
                                                <>
                                                    <Button onClick={() => handleSaveDeductionClick(deduction.id)} type="button">Save</Button>
                                                    <Button onClick={handleCancelDeductionClick} type="button">Cancel</Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button onClick={() => handleEditDeductionClick(deduction)} type="button">Edit</Button>
                                                    <Button onClick={() => deleteDeduction(deduction.id)} type="button">Delete</Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            value={newDeductionData.name}
                                            onChange={(e) => setNewDeductionData({ ...newDeductionData, name: e.target.value })}
                                            placeholder="Enter deduction name"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={newDeductionData.rate}
                                            onChange={(e) => setNewDeductionData({ ...newDeductionData, rate: parseFloat(e.target.value) })}
                                            placeholder="Enter deduction rate"
                                        />
                                    </td>
                                    <td>
                                        <Button onClick={handleAddDeduction} type="button">Add Deduction</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Grid>
                </Grid>
            </GridContainer>
        </main>
    )
}

