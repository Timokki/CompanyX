using CompanyX.Models;

namespace CompanyX.Services;

/// <summary>
/// A base class for using datastorage and reading ERP data.
/// </summary>
public abstract class DataService
{
  public abstract List<CustomerErpRecord> GetAll();

  public abstract CustomerErpRecord Get(int id);
  
  /// <summary>
  /// Used for opening database connection or file etc.
  /// </summary>
  /// <param name="connectionPath"></param>
  public virtual void Open(string connectionPath)
  {}

  /// <summary>
  /// Used for closing database connection or file etc.
  /// </summary>
  public virtual void Close()
  {}
  
  public abstract void Add(CustomerErpRecord customerDataItem);

  public abstract void Delete(int id);

  public abstract void Update(CustomerErpRecord customerDataItem);
}