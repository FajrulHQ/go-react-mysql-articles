import { Input, Radio, Tag } from "antd";
import { useArticleStore } from "../../store/article";
import TextArea from "antd/es/input/TextArea";

export default function ModalArticle() {
  const { article, modal, setArticle } = useArticleStore()
  const title_length = (article.title || '').length
  const category_length = (article.category || '').length
  const content_length = (article.content || '').length

  const status_title = title_length > 20 && title_length < 200
  const status_category = category_length > 3 && category_length < 100
  const status_content = content_length > 200
  return (
    <div className="space-y-2">
      <div>
        <label className="text-xs font-semibold">Title</label>
        <Input
          value={article.title}
          count={{
            show: true,
            max: 200,
          }}
          status={title_length < 20 ? "error" : undefined}
          onChange={e => setArticle({ ...article, title: e.target.value })}
        />
        {!status_title && <label className="text-xs text-red-500">*Title must be above 20 character</label>}
      </div>
      <div>
        <label className="text-xs font-semibold">Category</label>
        <Input
          value={article.category}
          count={{
            show: true,
            max: 100,
          }}
          status={category_length < 3 ? "error" : undefined}
          onChange={e => setArticle({ ...article, category: e.target.value })}
        />
        {article.category && article.category.split(',').map((item, i) => <Tag key={i} color="blue">{item}</Tag>)}
        {!status_category && <label className="text-xs text-red-500">*Category must be above 3 character</label>}
      </div>
      <div className="pb-4">
        <label className="text-xs font-semibold">Content</label>
        <TextArea
          value={article.content}
          showCount
          minLength={200}
          rows={8}
          status={content_length < 200 ? "error" : undefined}
          onChange={e => setArticle({ ...article, content: e.target.value })}
        />
        {!status_content && <label className="text-xs text-red-500">*Title must be above 200 character</label>}
      </div>
      {modal === 'edit' &&
        <div className="flex justify-center">
          <Radio.Group value={article.status} onChange={e => setArticle({ ...article, status: e.target.value })}>
            <Radio.Button value="draft">Draft</Radio.Button>
            <Radio.Button value="publish">Publish</Radio.Button>
          </Radio.Group>
        </div>
      }
    </div>
  );
}
