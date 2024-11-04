import pytest
from main import app
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.services.task import TaskServices

client = TestClient(app)

taskMock = {'id': 1, 'name': 'task 1', 'description': 'description 1', 'status': 'completed', 'created': '2024-11-04', 'updated': '2024-11-04'}
taskListMock = [
    {'id': 1, 'name': 'task 1', 'description': 'description 1', 'status': 'completed', 'created': '2024-11-04', 'updated': '2024-11-04'},
    {'id': 2, 'name': 'task 2', 'description': 'description 2', 'status': 'pending', 'created': '2024-11-04', 'updated': '2024-11-04'}
]


@pytest.fixture
def session_mock():
    with patch('app.database.Session', return_value=MagicMock()) as mock:
        yield mock

@pytest.fixture
def service_mock_delete():
    with patch.object(TaskServices, 'delete_task') as mock:
        yield mock

@pytest.fixture
def service_mock_get():
    with patch.object(TaskServices, 'get_tasks') as mock:
        yield mock


def test_get_tasks_missing_api_key(session_mock, service_mock_get):
    response = client.get('/api/task')
    assert response.status_code == 403
    assert response.json() == {"detail": "Falta la clave API o no es válida"}

def test_get_task_success(session_mock, service_mock_get):
    headers = {'API_KEY': 'dev'}
    service_mock_get.return_value = taskListMock
    response = client.get('/api/task', headers=headers)
    assert response.status_code == 200
    assert response.json() == {
        'status_code': 200,
        'message': 'Task list',
        'data': taskListMock
    }

def test_get_task_internal_error(session_mock, service_mock_get):
    headers = {'API_KEY': 'dev'}
    service_mock_get.side_effect = Exception("Internal server error")
    response = client.get('/api/task', headers=headers)
    assert response.status_code == 500
    assert response.json() == {"detail": "Internal server error"}

def test_delete_task_success(session_mock, service_mock_delete):
    headers = {'API_KEY': 'dev'}
    service_mock_delete.return_value = (True, taskMock)
    response = client.delete('/api/task/1', headers=headers)
    assert response.status_code == 200
    assert response.json() == {
        'status_code': 200,
        'message': 'task deleted',
        'data': taskMock
    }

def test_delete_task_not_found(session_mock, service_mock_delete):
    headers = {'API_KEY': 'dev'}
    service_mock_delete.return_value = (False, None)
    response = client.delete('/api/task/1', headers=headers)
    assert response.status_code == 404
    assert response.json() == {"detail": "Not found task"}

def test_delete_task_internal_error(session_mock, service_mock_delete):
    headers = {'API_KEY': 'dev'}
    service_mock_delete.side_effect = Exception("Internal server error")
    response = client.delete('/api/task/1', headers=headers)
    assert response.status_code == 500
    assert response.json() == {"detail": "Internal server error"}
