import axios from "axios";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const handleUpdate = async () => {
    const res = await axios.post("", {
      username,
      password,
    });
    if (res == null) {
      alert("Es hat etwas nicht geklappt.");
    }

    alert("POWNED");
  };

  return (
    <div>
      <h1>Willkommen liebes Computer Extra Team</h1>
      <p>
        Auf dieser Seite werdet ihr die Möglichkeit haben, für Teamevents
        abzustimmen, die wir in naher Zukunft angehen können.
      </p>
      <p>
        Nach dem Login mit euren Domänen Daten (Windows Login) könnt ihr neue
        Vorschläge abgeben oder für bestehende Vorschläge abstimmen.
      </p>
      <p>Der Login ist nötig, damit nur Mitarbeiter abstimmen können.</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Benutzername</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Anmelden" onClick={handleUpdate} />
      </form>
    </div>
  );
}

export default App;
