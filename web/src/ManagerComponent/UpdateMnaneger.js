import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutNew from '../Layout';

function ManagerUpdateItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateorder, setUpdateOrder] = useState({
        username: "",
        dili_address: "",
        dili_date: "",
        dili_status: "",
        dili_method: "",
        dili_cost: "",
        assignes_personal: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/managers/manager_item_order/${id}`);
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setUpdateOrder(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const validate = () => {
        const newErrors = {};

        // Customer Name validation
        if (!updateorder.username.trim()) {
            newErrors.username = "Customer Name is required.";
        }

        // Delivery Address validation
        if (!updateorder.dili_address.trim()) {
            newErrors.dili_address = "Delivery Address is required.";
        }

        // Delivery Date validation
        if (!updateorder.dili_date.trim()) {
            newErrors.dili_date = "Delivery Date is required.";
        }

        // Delivery Status validation
        if (!updateorder.dili_status) {
            newErrors.dili_status = "Delivery Status is required.";
        } else if (!["Pending", "Shipped", "Delivered"].includes(updateorder.dili_status)) {
            newErrors.dili_status = "Delivery Status must be one of: Pending, Shipped, Delivered.";
        }

        // Delivery Method validation
        if (!updateorder.dili_method.trim()) {
            newErrors.dili_method = "Delivery Method is required.";
        }

        // Delivery Cost validation
        if (!updateorder.dili_cost.trim()) {
            newErrors.dili_cost = "Delivery Cost is required.";
        } else if (isNaN(updateorder.dili_cost) || parseFloat(updateorder.dili_cost) <= 0) {
            newErrors.dili_cost = "Delivery Cost must be a positive number.";
        }

        // Assigned Personal validation
        if (!updateorder.assignes_personal.trim()) {
            newErrors.assignes_personal = "Assigned Personal is required.";
        }

        // Notes validation
        if (!updateorder.notes.trim()) {
            newErrors.notes = "Notes are required.";
        }

        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update state
        setUpdateOrder((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear individual field errors on change
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleUpdate = async () => {
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/managers/manager_item_update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updateorder._id,
                    ...updateorder,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Item updated successfully");
                navigate('/mdet');
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <LayoutNew>
            <div className='item-update' style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Update Delivery Details</h2>
                <form>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Customer Name:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleInputChange}
                        value={updateorder?.username}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.username && <p className="error" style={{ color: 'red' }}>{errors.username}</p>}

                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Address:</label>
                    <input
                        type="text"
                        id="dili_address"
                        name="dili_address"
                        onChange={handleInputChange}
                        value={updateorder?.dili_address}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.dili_address && <p className="error" style={{ color: 'red' }}>{errors.dili_address}</p>}

                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Date:</label>
                    <input
                        type="date"
                        id="dili_date"
                        name="dili_date"
                        onChange={handleInputChange}
                        value={updateorder?.dili_date}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.dili_date && <p className="error" style={{ color: 'red' }}>{errors.dili_date}</p>}

                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Status:</label>
                    <select
                        id="dili_status"
                        name="dili_status"
                        onChange={handleInputChange}
                        value={updateorder?.dili_status}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    {errors.dili_status && <p className="error" style={{ color: 'red' }}>{errors.dili_status}</p>}

                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Method:</label>
                    <input
                        type="text"
                        id="dili_method"
                        name="dili_method"
                        onChange={handleInputChange}
                        value={updateorder?.dili_method}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.dili_method && <p className="error" style={{ color: 'red' }}>{errors.dili_method}</p>}

                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Cost $:</label>
                    <input
                        type="text"
                        id="dili_cost"
                        name="dili_cost"
                        onChange={handleInputChange}
                        value={updateorder?.dili_cost}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.dili_cost && <p className="error" style={{ color: 'red' }}>{errors.dili_cost}</p>}

                    <label style={{ display: 'block', marginBottom: '5px' }}>Assigned Personal:</label>
                    <input
                        type="text"
                        id="assignes_personal"
                        name="assignes_personal"
                        onChange={handleInputChange}
                        value={updateorder?.assignes_personal}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.assignes_personal && <p className="error" style={{ color: 'red' }}>{errors.assignes_personal}</p>}

                    <label style={{ display: 'block', marginBottom: '5px' }}>Notes:</label>
                    <textarea
                        id="notes"
                        name="notes"
                        onChange={handleInputChange}
                        value={updateorder?.notes}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                    {errors.notes && <p className="error" style={{ color: 'red' }}>{errors.notes}</p>}

                    <button type="button" onClick={handleUpdate} style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Update
                    </button>
                </form>
            </div>
        </LayoutNew>
    );
}

export default ManagerUpdateItem;
