import axios from "axios";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleUpdate = async () => {
    const res = await axios.post(
      "https://events.computer-extra.de/php/login.php",
      {
        username,
        password,
      }
    );
    if (res == null) {
      setMessage(
        "Das hat leider nicht funktioniert. Es gab einen unerwarteten Fehler bei der Anmeldung, bitte erneut versuchen."
      );
      setPassword("");
    }
    if (res.data == "No Username or Password") {
      setMessage(
        "Das hat leider nicht funktioniert. Es scheint entweder kein Benutzername oder Passwort eingegeben zu sein."
      );
      setPassword("");
    }

    if (res.data == "ready") {
      setMessage(
        "Das hat leider nicht funktioniert. Es wurde ein falsches Passwort eingegeben!"
      );
      setPassword("");
    }
    if (res.data == "error") {
      setMessage(
        "Das hat leider nicht funktioniert. Es gab einen unerwarteten Fehler bei der Anmeldung, bitte erneut versuchen."
      );
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <h1 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              Computer Extra Events
            </h1>
            <p>
              Auf dieser Seite werdet ihr die Möglichkeit haben, für Teamevents
              abzustimmen, die wir in naher Zukunft angehen können.
            </p>
            <p>
              Nach dem Login mit euren Domänen Daten (Windows Login) könnt ihr
              neue Vorschläge abgeben oder für bestehende Vorschläge abstimmen.
            </p>
            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              Anmelden
            </h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setMessage(undefined);
                }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Benutzername
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="username"
                      type="text"
                      name="username"
                      required
                      value={username}
                      onChange={(e) => {
                        setMessage(undefined);
                        setUsername(e.target.value);
                      }}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setMessage(undefined);
                        setPassword(e.target.value);
                      }}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                {message && (
                  <div className="mt-6 text-center text-red-600 uppercase font-semibold text-xl">
                    {message}
                  </div>
                )}

                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      onClick={() => {
                        void handleUpdate();
                        setPassword(undefined);
                      }}
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Anmelden
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default App;
