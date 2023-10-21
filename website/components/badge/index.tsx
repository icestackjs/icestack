export function DemoWithIcon() {
  return (
    <>
      <div className="badge badge-info gap-1">
        <i className="i-mdi-close h-4 w-4" />
        info
      </div>
      <div className="badge badge-success gap-1">
        <i className="i-mdi-close h-4 w-4" />
        success
      </div>
      <div className="badge badge-warning gap-1">
        <i className="i-mdi-close h-4 w-4" />
        warning
      </div>
      <div className="badge badge-error gap-1">
        <i className="i-mdi-close h-4 w-4" />
        error
      </div>
    </>
  )
}
