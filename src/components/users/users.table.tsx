"use client";

import { IUser } from "@/types/backend";
import { Table, Popconfirm, Button } from 'antd';
import type { ColumnsType } from "antd/es/table";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import CreateUser from '@/app/users/create.user';
import UpdateUser from '@/app/users/update.user';
import { handleDeleteUserAction } from '@/actions';


interface IProps {
  users: IUser[] | [];
  meta: {
    current: number;
    pageSize: number;
    total: number
  }
}

const UsersTable = (props: IProps) => {
  const { users, meta } = props;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);


useEffect(() => {
  if(users) setIsFetching(false)
}, [users])

  const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isFetching, setIsFetching] = useState<boolean>(false)


  const columns: ColumnsType<IUser> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: 'Actions',
      align: "center",
      render: (text, record, index) => {
          return (
              <>
                  <EditTwoTone
                      twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 20px" }}
                      onClick={() => {
                          setIsUpdateModalOpen(true);
                          setDataUpdate(record);
                      }}
                  />

                  <Popconfirm
                      placement="leftTop"
                      title={"Xác nhận xóa user"}
                      description={"Bạn có chắc chắn muốn xóa user này ?"}
                      onConfirm={() => handleDeleteUser(record)}
                      okText="Xác nhận"
                      cancelText="Hủy"
                  >
                      <span style={{ cursor: "pointer" }}>
                          <DeleteTwoTone twoToneColor="#ff4d4f" />
                      </span>
                  </Popconfirm>
              </>
          )
      }
  }

  ];
  const handleDeleteUser = async (user: any) => {
    await handleDeleteUserAction({ id: user.id })
};

const renderHeader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Table List Users</span>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setIsCreateModalOpen(true)}
            >
                Thêm mới
            </Button>
        </div>
    )
}

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
        const params = new URLSearchParams(searchParams);
        params.set('page', pagination.current);
        replace(`${pathname}?${params.toString()}`);
        setIsFetching(true)
    }
};

  return (
    <div>
      <Table
      title={renderHeader}
      loading={isFetching}
      rowKey={"id"}
        bordered
        dataSource={users}
        columns={columns}
        onChange={onChange}
        pagination={{
          ...meta,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} of {total} rows
              </div>
            );
          },
        }}
      />
       <CreateUser
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />

            <UpdateUser
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

      ;
    </div>
  );
};

export default UsersTable;
