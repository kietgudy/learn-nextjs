import UsersTable from "@/components/users/users.table";

const UserPage = async (props: any) => {
  const LIMIT = 1;
  const page = props?.searchParams?.page ?? 1;
  const res = await fetch(
    `http://localhost:8000/users?_page=${page}&_limit=${LIMIT}`,
    {
      method: "GET",
    }
  );
  const total_items = +(res.headers?.get("X-Total-Count") ?? 0);

  const data = await res.json();
  return (
    <div>
      <UsersTable
        users={data ? data : []}
        meta={{ current: +page, pageSize: LIMIT, total: total_items }}
      />
    </div>
  );
};

export default UserPage;
