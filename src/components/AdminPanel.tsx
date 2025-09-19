import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import abiJson from "../contracts/CertifyRoles/CertifyRoles.json";

interface AdminPanelProps {
  account: string;
  modoOscuro: boolean;
}

const AdminPanel = ({ modoOscuro }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("institutions");
  const [directorAddress, setDirectorAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [directors, setDirectors] = useState<string[]>([]);
  const [studentAddress, setStudentAddress] = useState("");
  const [students, setStudents] = useState<string[]>([]);

  const contractAddress = "0x786E41e7a24C8B9031b91749F8f1A649457CC1BF"; // <-- update this
  const abi = abiJson.abi;

  const getContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask is not available");

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(contractAddress, abi, signer);
  };

  const fetchDirectors = async () => {
    try {
      const contract = await getContract();
      const result = await contract.getAllDirectors();
      setDirectors(result);
    } catch (error) {
      console.error("Error fetching directors:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "directors") {
      fetchDirectors();
    }
  }, [activeTab]);

  const handleAddDirector = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.addDirector(directorAddress);
      await tx.wait();
      setMessage(`Director ${directorAddress} successfully added.`);
      setDirectorAddress("");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "ACTION_REJECTED"
      ) {
        setMessage("❌ Action canceled by the user.");
      } else {
        setMessage(
          `⚠️ Error: ${
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message?: string }).message
              : String(error)
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDirector = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.removeDirector(directorAddress);
      await tx.wait();
      setMessage(`Director ${directorAddress} successfully removed.`);
      setDirectorAddress("");
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        setMessage("❌ Action canceled by the user.");
      } else {
        setMessage(`⚠️ Error: ${error.message || error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const contract = await getContract();
      const result = await contract.getAllStudents();
      setStudents(result);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAddStudent = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.addStudent(studentAddress);
      await tx.wait();
      setMessage(`Student ${studentAddress} successfully added.`);
      setStudentAddress("");
      fetchStudents(); // update list
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        setMessage("❌ Action canceled by the user.");
      } else {
        setMessage(`⚠️ Error: ${error.message || error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStudent = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const tx = await contract.removeStudent(studentAddress);
      await tx.wait();
      setMessage(`Student ${studentAddress} successfully removed.`);
      setStudentAddress("");
      fetchStudents(); // update list
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        setMessage("❌ Action canceled by the user.");
      } else {
        setMessage(`⚠️ Error: ${error.message || error}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (activeTab === "students") {
    fetchStudents();
  }
}, [activeTab]);


  return (
    <div>
      <h1
        className={`text-3xl font-bold mb-6 ${
          modoOscuro ? "text-white" : "text-gray-800"
        }`}
      >
        Administration Panel
      </h1>

      <div
        className={`flex border-b mb-6 ${
          modoOscuro ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {[
          "institutions",
          "directors",
          "students",
          "configuration",
          "audit",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              modoOscuro ? "text-gray-300" : "text-gray-600"
            } ${
              activeTab === tab
                ? modoOscuro
                  ? "border-b-2 border-blue-500 text-white"
                  : "border-b-2 border-blue-500 text-blue-600"
                : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className={`p-6 rounded-lg ${
          modoOscuro ? "bg-gray-800" : "bg-white shadow"
        }`}
      >
        {activeTab === "institutions" && (
          <div>
            <h2
              className={`text-xl font-semibold mb-4 ${
                modoOscuro ? "text-white" : "text-gray-800"
              }`}
            >
              Institutions Management
            </h2>
            <p className={modoOscuro ? "text-gray-300" : "text-gray-600"}>
              Here you can add, edit or remove authorized institutions to issue certificates.
            </p>
          </div>
        )}

        {activeTab === "directors" && (
          <div>
            <h2
              className={`text-xl font-semibold mb-4 ${
                modoOscuro ? "text-white" : "text-gray-800"
              }`}
            >
              Directors Management
            </h2>
            <p className={modoOscuro ? "text-gray-300" : "text-gray-600 mb-4"}>
              Manage directors and administrators who can handle certificates.
            </p>

            <input
              type="text"
              placeholder="Director's address"
              value={directorAddress}
              onChange={(e) => setDirectorAddress(e.target.value)}
              className="border px-4 py-2 w-full mb-4 rounded"
            />

            <div className="flex gap-4">
              <button
                onClick={handleAddDirector}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Director
              </button>
              <button
                onClick={handleRemoveDirector}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Director
              </button>
            </div>

            {message && (
              <div
                className={`mt-4 p-2 rounded ${
                  modoOscuro
                    ? "bg-gray-700 text-green-300"
                    : "bg-gray-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            {directors.length > 0 && (
              <div className="mt-6">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    modoOscuro ? "text-white" : "text-gray-800"
                  }`}
                >
                  Directors List:
                </h3>
                <ul className="list-disc pl-5">
                  {directors.map((dir, index) => (
                    <li
                      key={index}
                      className={`${
                        modoOscuro ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {dir}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <h2
              className={`text-xl font-semibold mb-4 ${
                modoOscuro ? "text-white" : "text-gray-800"
              }`}
            >
              Students Management
            </h2>
            <p className={modoOscuro ? "text-gray-300" : "text-gray-600 mb-4"}>
              Manage students authorized to receive certificates.
            </p>

            <input
              type="text"
              placeholder="Student's address"
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
              className="border px-4 py-2 w-full mb-4 rounded"
            />

            <div className="flex gap-4">
              <button
                onClick={handleAddStudent}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Student
              </button>
              <button
                onClick={handleRemoveStudent}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Student
              </button>
            </div>

            {message && (
              <div
                className={`mt-4 p-2 rounded ${
                  modoOscuro
                    ? "bg-gray-700 text-green-300"
                    : "bg-gray-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            {students.length > 0 && (
              <div className="mt-6">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    modoOscuro ? "text-white" : "text-gray-800"
                  }`}
                >
                  Students List:
                </h3>
                <ul className="list-disc pl-5">
                  {students.map((stu, index) => (
                    <li
                      key={index}
                      className={modoOscuro ? "text-gray-300" : "text-gray-700"}
                    >
                      {stu}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "configuration" && (
          <div>
            <h2
              className={`text-xl font-semibold mb-4 ${
                modoOscuro ? "text-white" : "text-gray-800"
              }`}
            >
              System Configuration
            </h2>
            <p className={modoOscuro ? "text-gray-300" : "text-gray-600"}>
              General settings and parameters of the certification system.
            </p>
          </div>
        )}

        {activeTab === "audit" && (
          <div>
            <h2
              className={`text-xl font-semibold mb-4 ${
                modoOscuro ? "text-white" : "text-gray-800"
              }`}
            >
              Activity Audit
            </h2>
            <p className={modoOscuro ? "text-gray-300" : "text-gray-600"}>
              Record of all activities performed in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;