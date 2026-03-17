import React, { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

function UserScreen() {
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [editingUserId, setEditingUserId] = useState(null)
	const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' })
	const [actionLoading, setActionLoading] = useState(false)
	const [successMessage, setSuccessMessage] = useState('')

	const navigate = useNavigate()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const isAdmin = Boolean(userInfo && userInfo.isAdmin)

	const fetchUsers = useCallback(async () => {
		if (!userInfo?.token) {
			return
		}

		try {
			setLoading(true)
			setError('')
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get('http://127.0.0.1:8000/api/admin/users/', config)
			setUsers(data)
		} catch (err) {
			setError(
				err.response && err.response.data && err.response.data.detail
					? err.response.data.detail
					: 'Unable to load users.'
			)
		} finally {
			setLoading(false)
		}
	}, [userInfo])

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
			return
		}

		if (!isAdmin) {
			navigate('/home')
			return
		}

		fetchUsers()
	}, [userInfo, isAdmin, navigate, fetchUsers])

	const startEditHandler = (user) => {
		if (!isAdmin) {
			return
		}

		setEditingUserId(user.id)
		setSuccessMessage('')
		setFormData({
			first_name: user.first_name || '',
			last_name: user.last_name || '',
			email: user.email || '',
		})
	}

	const cancelEditHandler = () => {
		setEditingUserId(null)
		setFormData({ first_name: '', last_name: '', email: '' })
	}

	const saveEditHandler = async (id) => {
		if (!isAdmin) {
			return
		}

		try {
			setActionLoading(true)
			setError('')
			setSuccessMessage('')

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.put(
				`http://127.0.0.1:8000/api/admin/users/${id}/`,
				{
					first_name: formData.first_name,
					last_name: formData.last_name,
					email: formData.email,
				},
				config
			)

			setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? data : user)))
			setEditingUserId(null)
			setSuccessMessage('User updated successfully.')
		} catch (err) {
			setError(
				err.response && err.response.data && err.response.data.detail
					? err.response.data.detail
					: 'Unable to update user.'
			)
		} finally {
			setActionLoading(false)
		}
	}

	const deleteHandler = async (id) => {
		if (!isAdmin) {
			return
		}

		const confirmDelete = window.confirm('Are you sure you want to delete this user?')
		if (!confirmDelete) {
			return
		}

		try {
			setActionLoading(true)
			setError('')
			setSuccessMessage('')

			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			await axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}/`, config)
			setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
			setSuccessMessage('User deleted successfully.')
		} catch (err) {
			setError(
				err.response && err.response.data && err.response.data.detail
					? err.response.data.detail
					: 'Unable to delete user.'
			)
		} finally {
			setActionLoading(false)
		}
	}

	return (
		<div>
			<h1 className='mb-3'>Users</h1>

			{error ? <Alert variant='danger'>{error}</Alert> : null}
			{successMessage ? <Alert variant='success'>{successMessage}</Alert> : null}

			{loading ? (
				<div className='text-center py-4'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			) : (
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th className='text-center'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id}>
								<td>
									{editingUserId === user.id ? (
										<Form.Control
											type='text'
											value={formData.first_name}
											onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
										/>
									) : (
										user.first_name || '-'
									)}
								</td>
								<td>
									{editingUserId === user.id ? (
										<Form.Control
											type='text'
											value={formData.last_name}
											onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
										/>
									) : (
										user.last_name || '-'
									)}
								</td>
								<td>
									{editingUserId === user.id ? (
										<Form.Control
											type='email'
											value={formData.email}
											onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										/>
									) : (
										user.email
									)}
								</td>
								<td className='text-center'>
									{editingUserId === user.id ? (
										<>
											<Button
												variant='success'
												size='sm'
												className='me-2'
												onClick={() => saveEditHandler(user.id)}
												disabled={actionLoading || !isAdmin}
											>
												Save
											</Button>
											<Button
												variant='secondary'
												size='sm'
												onClick={cancelEditHandler}
												disabled={actionLoading}
											>
												Cancel
											</Button>
										</>
									) : (
										<>
											<Button
												variant='primary'
												size='sm'
												className='me-2'
												onClick={() => startEditHandler(user)}
												disabled={actionLoading || !isAdmin}
											>
												Edit
											</Button>
											<Button
												variant='danger'
												size='sm'
												onClick={() => deleteHandler(user.id)}
												disabled={actionLoading || !isAdmin}
											>
												Delete
											</Button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	)
}

export default UserScreen
