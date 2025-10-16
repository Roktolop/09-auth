interface Props {
  children: React.ReactNode,
  sidebar: React.ReactNode
}

export default function Layout({ children, sidebar }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      {sidebar}
      {children}
    </div >
  )
}