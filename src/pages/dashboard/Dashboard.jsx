export default function Dashboard() {
    // get user(again damnnttt)

    // TODO: membuat tampilan nevbar di kiri, biar enak di pandang & jadi pembeda buat navbar nya.

    return (
        <div>
            <h1>Welcome to Dashboard, User</h1>
            <div className="flex justify-between mx-9 ">
                <a href="/dashboard/account">Accout Info</a>
                {true ? (
                    <>
                        <a href="/dashboard/account">Create Car</a>
                        <a href="/dashboard/account">Create Rent</a>
                        <a href="/dashboard/account">Create User</a>
                        <a href="/dashboard/account">Show Rent</a>
                        <a href="/dashboard/account">Show Users</a>
                        <a href="/dashboard/account">Show Pinalti</a>
                    </>
                ) : ""}

            </div>
        </div>
    );
}