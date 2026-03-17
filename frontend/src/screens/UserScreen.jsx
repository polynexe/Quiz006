import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers, updateUser } from '../actions/userActions'
import { USER_DELETE_RESET, USER_UPDATE_RESET } from '../constants/userConstants'

function UserScreen() {
	const [editingUserId, setEditingUserId] = useState(null)
	const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' })
	const [successMessage, setSuccessMessage] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const userList = useSelector((state) => state.userList)
	const { loading, error, users = [] } = userList
	const userUpdate = useSelector((state) => state.userUpdate)
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate
	const userDelete = useSelector((state) => state.userDelete)
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = userDelete

	const isAdmin = Boolean(userInfo && userInfo.isAdmin)
	const actionLoading = loadingUpdate || loadingDelete
	const actionError = errorUpdate || errorDelete

	useEffect(() => {
		if (!userInfo) {
			navigate('/login')
			return
		}

		if (!isAdmin) {
			navigate('/home')
			return
		}

		dispatch(listUsers())
	}, [dispatch, userInfo, isAdmin, navigate])

	useEffect(() => {
		if (successUpdate) {
			setEditingUserId(null)
			setSuccessMessage('User updated successfully.')
			dispatch({ type: USER_UPDATE_RESET })
			dispatch(listUsers())
		}
	}, [dispatch, successUpdate])

	useEffect(() => {
		if (successDelete) {
			setSuccessMessage('User deleted successfully.')
			dispatch({ type: USER_DELETE_RESET })
			dispatch(listUsers())
		}
	}, [dispatch, successDelete])

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

		setSuccessMessage('')
		dispatch(
			updateUser(id, {
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email,
			})
		)
	}

	const deleteHandler = (id) => {
		if (!isAdmin) {
			return
		}

		const confirmDelete = window.confirm('Are you sure you want to delete this user?')
		if (!confirmDelete) {
			return
		}

		setSuccessMessage('')
		dispatch(deleteUser(id))
	}

	return (
		<div>
			<h1 className='mb-3'>Users</h1>

			{error ? <Alert variant='danger'>{error}</Alert> : null}
			{actionError ? <Alert variant='danger'>{actionError}</Alert> : null}
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
