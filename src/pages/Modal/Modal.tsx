import { useState } from 'react';
import AppShell from '../../components/AppShell/AppShell';
import PageIntro from '../../components/PageIntro/PageIntro';
import ComponentPreview from '../../components/ComponentPreview/ComponentPreview';
import PropsTable, { type PropRow } from '../../components/PropsTable/PropsTable';
import Modal from '../../components/Modal/Modal';
import Btn from '../../components/Button/Button';

const props: PropRow[] = [
  { name: 'open', type: 'boolean', required: true, description: 'Visibility of the dialog. Controlled.' },
  { name: 'onClose', type: '() => void', required: true, description: 'Called when the user dismisses (backdrop, escape, close button).' },
  { name: 'title', type: 'ReactNode', description: 'Heading rendered in the dialog header.' },
  { name: 'description', type: 'ReactNode', description: 'Short paragraph below the title.' },
  { name: 'footer', type: 'ReactNode', description: 'Action area, typically Buttons.' },
  { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Dismiss when the backdrop is clicked.' },
  { name: 'closeOnEscape', type: 'boolean', default: 'true', description: 'Dismiss when Escape is pressed.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Width preset: 380 / 480 / 640 px.' },
];

export default function ModalPage() {
  const [open, setOpen] = useState(false);
  const [danger, setDanger] = useState(false);

  return (
    <AppShell>
      <PageIntro
        eyebrow="Components · Overlay"
        title="Modal"
        lede="A focused overlay dialog. Portaled to document.body. Dismisses via close button, Escape key, or backdrop click. Locks body scroll while open."
      />

      <ComponentPreview
        title="Default"
        description="A confirmation modal with title, description, and a footer of actions."
        code={`const [open, setOpen] = useState(false);
return (
  <>
    <Button onClick={() => setOpen(true)}>Open modal</Button>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Save changes?"
      description="Your draft will be published to the live graph."
      footer={
        <>
          <Button variant="default" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>Save</Button>
        </>
      }
    />
  </>
);`}
      >
        <Btn variant="primary" onClick={() => setOpen(true)}>Open modal</Btn>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Save changes?"
          description="Your draft will be published to the live graph and notified to subscribers."
          footer={
            <>
              <Btn variant="default" onClick={() => setOpen(false)}>Cancel</Btn>
              <Btn variant="primary" onClick={() => setOpen(false)}>Save</Btn>
            </>
          }
        />
      </ComponentPreview>

      <ComponentPreview
        title="Destructive"
        description="Pair with a danger primary button for confirmation of irreversible actions."
        code={`<Modal
  open={open}
  onClose={onClose}
  title="Delete project?"
  description="This action can't be undone."
  footer={
    <>
      <Button variant="default">Cancel</Button>
      <Button variant="primary" danger>Delete project</Button>
    </>
  }
/>`}
      >
        <Btn variant="primary" danger onClick={() => setDanger(true)}>Delete project</Btn>
        <Modal
          open={danger}
          onClose={() => setDanger(false)}
          title="Delete project?"
          description="This can't be undone. The project and all 1,284 nodes will be permanently removed from the taxonomy graph."
          footer={
            <>
              <Btn variant="default" onClick={() => setDanger(false)}>Cancel</Btn>
              <Btn variant="primary" danger onClick={() => setDanger(false)}>Delete project</Btn>
            </>
          }
        />
      </ComponentPreview>

      <PropsTable rows={props} />
    </AppShell>
  );
}
