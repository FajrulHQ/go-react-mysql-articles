import { Button, Card, Pagination, Tag } from "antd";
import { ArrowLeftCircle } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import APIRequest from "../../../api/request";
import { useEffect, useState } from "react";
import { useArticleStore } from "../../../store/article";

export default function ArticlePreview() {
  const navigate = useNavigate()
  const { articles, setArticles } = useArticleStore()
  const [{ limit, offset, total }, setPagination] = useState({ limit: 6, offset: 0, total: 0 })
  const { mutate: onRetrieveArticle } = useMutation(async () => {
    const { data } = await APIRequest({
      method: 'GET',
      path: '/articles',
      params: { status: 'publish', limit, offset }
    })
    return data
  }, {
    onSuccess: (response) => {
      const { data, limit, offset, total } = response
      setPagination({ limit, offset, total })
      setArticles(data)
    }
  })

  useEffect(() => {
    onRetrieveArticle()
  }, [limit, offset]);
  
  return (
    <div className="h-screen bg-gray-50">
      <div className="flex justify-between bg-white p-2 shadow-sm">
        <ArrowLeftCircle className="cursor-pointer text-primary hover:text-primary/70" onClick={() => navigate('/')} />
      </div>
      <div className="mx-16 my-8 grid grid-cols-3 gap-8">
        <div className="flex items-center justify-between  col-span-3">
          <label className="font-semibold text-2xl">Article</label>
          <Pagination
            total={total}
            pageSize={limit}
            current={Math.floor(offset / limit) + 1}
            onChange={(page, pageSize) => {
              setPagination({
                limit: pageSize,
                offset: (page - 1) * pageSize,
                total
              })
            }}
          />
        </div>
        {articles.map(({ title, content, category, id, status }) => (
          <Card key={id} hoverable>
            <Card.Meta
              title={<p className="text-lg font-semibold">{title}</p>}
              description={
                <div>
                  <div className="flex mb-1 flex-wrap">
                    {category && category.split(',').map(item => <Tag>{item}</Tag>)}
                  </div>
                  {content}
                </div>
              }
              style={{ height: 160 }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
