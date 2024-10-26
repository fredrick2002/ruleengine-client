import React, { useState } from 'react';
import axios from 'axios';
import TreeNode from './TreeNode';
import ReactJson from 'react-json-view'; // Import the JSON view component

function App() {
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [selectedRule, setSelectedRule] = useState('');
  const [jsonResponse, setJsonResponse] = useState(null);
  const [evaluated, setEvaluated] = useState(null);
  const [error, setError] = useState(null);
  const [combinedResult, setCombinedResult] = useState(null); // State for storing combined result

  const fetchRuleData = async (ruleId) => {
    try {
      const response = await axios.get(`http://localhost:8080/rules/${ruleId}`);
      setJsonResponse(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching rule data:", error);
      setError("Failed to fetch rule data. Please try again.");
    }
  };

  const handleRuleSelection = (e) => {
    const ruleId = e.target.value;
    setSelectedRule(ruleId);
    if (ruleId) {
      fetchRuleData(ruleId);
    } else {
      setJsonResponse(null);
    }
  };

  const handleEvaluate = async () => {
    const requestBody = {
      age: parseInt(age, 10),
      department,
      salary: parseFloat(salary),
      experience: parseInt(experience, 10),
    };

    try {
      const response = await axios.post(`http://localhost:8080/rules/${selectedRule}/evaluate`, requestBody);
      setEvaluated(JSON.stringify(response.data)); // Update state with evaluation result
      setError(null);
    } catch (error) {
      console.error("Error evaluating rule:", error);
      setError("Failed to evaluate rule. Please try again.");
    }
  };

  const handleCombine = async () => {
    try {
      // First, fetch the data for rule 1 and rule 2
      const rule1Response = await axios.get(`http://localhost:8080/rules/1`);
      const rule2Response = await axios.get(`http://localhost:8080/rules/2`);
      
      // Prepare the request body for combining the rules
      const requestBody = {
        ruleIds: [1, 2],
      };

      // Call the combine API
      const response = await axios.post(`http://localhost:8080/rules/combine`, requestBody);
      setCombinedResult(response.data); // Store the combined result (do not stringify)
      setError(null);
    } catch (error) {
      console.error("Error combining rules:", error);
      setError("Failed to combine rules. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Rule Engine</h2>

      <div className="space-y-4">
        <label>Age: </label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <label>Department: </label>
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <label>Salary: </label>
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <label>Experience: </label>
        <input
          type="number"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border rounded p-2 w-full"
        />

        <select
          onChange={handleRuleSelection}
          value={selectedRule}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Rule</option>
          <option value="1">Rule 1</option>
          <option value="2">Rule 2</option>
        </select>

        <button
          onClick={handleEvaluate}
          className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
        >
          Evaluate
        </button>

        <button
          onClick={handleCombine}
          className="bg-green-500 text-white rounded p-2 w-full hover:bg-green-600"
        >
          Combine Rule 1 and 2
        </button>

        {/* Display the evaluated result */}
        <div className="mt-2 text-green-600">
          <h3>Evaluation Result:</h3>
          <h4>{evaluated}</h4>
        </div>

        {/* Display the combined result as a JSON tree */}
        {combinedResult && (
          <div className="mt-2">
            <h3 className="text-blue-600">Combined tree Result:</h3>
            <ReactJson src={combinedResult} theme="monokai" iconStyle="circle" />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default App;
