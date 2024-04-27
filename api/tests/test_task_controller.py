import unittest
from conftest import client

class TestTaskController(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = client 

    def test_get_tasks(self):
        response = self.client.get('/v1/tasks')
        self.assertEqual(response.status_code, 200)

    def test_create_task(self):
        task_data = {
            "title": "Test Task",
            "description": "Test Description",
            "status": "Pending"
        }
        response = self.client.post('/v1/tasks', json=task_data)
        self.assertEqual(response.status_code, 201)

    def test_get_task_by_id(self):
        response = self.client.get('/v1/tasks/1')
        self.assertEqual(response.status_code, 200)

    def test_update_task(self):
        task_data = {
            "title": "Updated Test Task",
            "status": "Completed"
        }
        response = self.client.put('/v1/tasks/1', json=task_data)
        self.assertEqual(response.status_code, 200)

    def test_delete_task(self):
        response = self.client.delete('/v1/tasks/1')
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()
