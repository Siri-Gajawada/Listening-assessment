function NameInput({ name, setName }) {
    return (
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginLeft: "10px", padding: "5px", width: "250px" }}
        />
      </div>
    );
  }


  export default NameInput;
  