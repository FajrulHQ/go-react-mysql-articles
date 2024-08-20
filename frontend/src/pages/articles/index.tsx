import { Button, message, Modal, Popconfirm, Table, TableProps, Tabs, TabsProps, Tag, Tooltip } from "antd";
import { CloudUpload, Eye, Pencil, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from "react";
import { useMutation } from 'react-query';
import APIRequest from "../../api/request";
import { useArticleStore } from "../../store/article";
import ModalArticle from "./modal";
import { ArticleType } from "./type";
import { useLocation, useNavigate } from "react-router-dom";

export default function ArticlePage() {
  const { selected_tab, modal, article, articles, setSelectedTab, onModal, setArticles, setArticle } = useArticleStore()
  const [{ limit, offset, total }, setPagination] = useState({ limit: 5, offset: 0, total: 0 })
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const tab_items: TabsProps['items'] = [
    { key: 'publish', label: 'Published' },
    { key: 'draft', label: 'Drafts' },
    { key: 'trash', label: 'Trashed' },
  ];

  const title_length = (article.title || '').length
  const category_length = (article.category || '').length
  const content_length = (article.content || '').length

  const status_title = title_length > 20 && title_length < 200
  const status_category = category_length > 3 && category_length < 100
  const status_content = content_length > 200

  const { mutate: onRetrieveArticle } = useMutation(async () => {
    const { data } = await APIRequest({
      method: 'GET',
      path: '/articles',
      params: { status: selected_tab, limit, offset }
    })
    return data
  }, {
    onSuccess: (response) => {
      const { data, limit, offset, total } = response
      setPagination({ limit, offset, total })
      setArticles(data)
    }
  })

  const { mutate: onCreateArticle } = useMutation(async () => {
    const { data } = await APIRequest({
      method: 'POST',
      path: '/articles',
      data: article
    })
    return data
  }, {
    onSuccess: () => { messageApi.success("Success to create article"); onRetrieveArticle() },
    onError: () => { messageApi.error("Failed to create article") },
  })

  const { mutate: onEditArticle } = useMutation(async ({ article }: {
    article: ArticleType
  }) => {
    const { data } = await APIRequest({
      method: 'PUT',
      path: '/articles/' + article.id,
      data: article
    })
    return data
  }, {
    onSuccess: () => { messageApi.success("Success to update article"); onRetrieveArticle() },
    onError: () => { messageApi.error("Failed to update article") },
  })

  const onSubmit = async () => {
    if (modal === 'add') {
      onCreateArticle()
      setSelectedTab('draft')
    }
    else if (modal === 'edit') {
      onEditArticle({ article })
    }

    setArticle({})
    onModal(undefined)
  }

  useEffect(() => {
    onRetrieveArticle()
  }, [selected_tab, limit, offset]);

  const columns: TableProps<ArticleType>['columns'] = [
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      align: 'center',
    },
    {
      key: 'category',
      title: 'Category',
      dataIndex: 'category',
      align: 'center',
      render: category => (category || '').split(",").map((item: any, i: number) => <Tag key={i} color="blue">{item}</Tag>)
    },
    {
      key: 'action',
      title: '',
      width: 100,
      render: (data) => {
        return (
          <div className="flex gap-2 justify-center items-center">
            {data.status === 'draft' &&
              <Tooltip title='Publish Article'>
                <Popconfirm
                  title="Publish the article"
                  description="Are you sure to publish this article?"
                  onOpenChange={(open) => setArticle(open ? data : {})}
                  onConfirm={() => onEditArticle({ article: { ...article, status: 'publish' } })}
                >
                  <Button icon={<CloudUpload className="h-4 w-4" />} />
                </Popconfirm>
              </Tooltip>
            }
            <Tooltip title='Edit Article'>
              <Button
                icon={<Pencil className="h-4 w-4" />}
                onClick={() => {
                  setArticle(data)
                  onModal('edit')
                }}
              />
            </Tooltip>
            {data.status !== 'trash' &&
              <Tooltip title='Delete Article'>
                <Popconfirm
                  title="Delete the article"
                  description="Are you sure to delete this article?"
                  onOpenChange={(open) => setArticle(open ? data : {})}
                  onConfirm={() => onEditArticle({ article: { ...article, status: 'trash' } })}
                >
                  <Button icon={<Trash className="h-4 w-4" />} danger />
                </Popconfirm>
              </Tooltip>
            }
          </div>
        )
      }
    }
  ]

  return (
    <div>
      {contextHolder}
      <Tabs
        type="card"
        accessKey={selected_tab}
        items={tab_items}
        onChange={(key: any) => { setSelectedTab(key); setPagination({ total, limit, offset: 0 }) }}
      />
      <div className="mx-8 space-y-2">
        <div className="flex justify-end gap-2">
          <Button className="mr-2" onClick={() => { onModal('add'); setArticle({ status: 'draft' }) }}><Plus className="h-4 w-4" />Add New</Button>
          <Button className="mr-2" onClick={() => navigate('/preview')} type="primary"><Eye className="h-4 w-4" />Preview</Button>
        </div>
        <Table
          columns={columns}
          dataSource={articles.map(item => ({ ...item, key: item.id }))}
          pagination={{
            total,
            pageSize: limit,
            current: Math.floor(offset / limit) + 1,
            hideOnSinglePage: true,
            onChange: (page, pageSize) => {
              setPagination({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                total
              })
            }
          }}
        />
      </div>
      <Modal
        title={modal === 'edit' ? 'Edit article' : "Add new article"}
        open={Boolean(modal)}
        onCancel={() => onModal(undefined)}
        okText="Submit"
        onOk={onSubmit}
        okButtonProps={{
          disabled: !status_title || !status_category || !status_content || !article.status
        }}
      >
        <ModalArticle />
      </Modal>
    </div>
  );
}
