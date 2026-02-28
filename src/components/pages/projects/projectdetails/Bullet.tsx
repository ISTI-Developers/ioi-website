import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../../forms/fields/FormFieldTextArea";
import { useProject } from "@/hooks/useProjects";

interface BulletProps {
  projectId: number;
}

export default function Bullet({ projectId }: BulletProps) {
  const form = useForm({
    defaultValues: {
      problem: "",
      solution: "",
      service: "",
      result: "",
    },
    mode: "all",
  });

  const { data: project, isLoading } = useProject(projectId);

  if (isLoading) return <p>Loading bullets...</p>;

  const points = project?.points || [];

  const problems = points.filter((p) => p.type === "problem");
  const solutions = points.filter((p) => p.type === "solution");
  const services = points.filter((p) => p.type === "service");
  const results = points.filter((p) => p.type === "result");

  return (
    <Form {...form}>
      <div className="space-y-10 gap-5">
        <div className="flex gap-2">
          <FormCardContent title="Problems">
            <ul className="list-disc list-inside">
              {problems.map((p) => (
                <li key={p.point_id}>{p.content}</li>
              ))}
            </ul>
            <FormFieldTextArea
              control={form.control}
              name="problem"
              label="description"
              placeholder="Add a problem..."
            />
            <div className="flex justify-end">
                <Button type="submit" size="sm" className="mt-2">Add</Button>
            </div>
          </FormCardContent>

          <FormCardContent title="Solutions">
            <ul>
              {solutions.map((p) => (
                <li key={p.point_id}>{p.content}</li>
              ))}
            </ul>
            <FormFieldTextArea
              control={form.control}
              name="solution"
              label=""
              placeholder="Add a solution..."
            />
              <div className="flex justify-end">
                <Button type="submit" size="sm" className="mt-2">Add</Button>
            </div>
          </FormCardContent>
        </div>

        <div className="flex gap-2">
          <FormCardContent title="Service Rendered">
            <ul>
              {services.map((p) => (
                <li key={p.point_id}>{p.content}</li>
              ))}
            </ul>
            <FormFieldTextArea
              control={form.control}
              name="service"
              label=""
              placeholder="Add a service..."
            />
              <div className="flex justify-end">
                <Button type="submit" size="sm" className="mt-2">Add</Button>
            </div>
          </FormCardContent>

          <FormCardContent title="Key Results">
            <ul>
              {results.map((p) => (
                <li key={p.point_id}>{p.content}</li>
              ))}
            </ul>
            <FormFieldTextArea
              control={form.control}
              name="result"
              label=""
              placeholder="Add a result..."
            />
              <div className="flex justify-end">
                <Button type="submit" size="sm" className="mt-2">Add</Button>
            </div>
          </FormCardContent>
        </div>
      </div>
    </Form>
  );
}